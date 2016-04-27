'use strict';

var
  gulp       = require('gulp'),
  gutil      = require('gulp-util'),
  git        = require('gulp-git'),
  browserify = require('browserify'),
  babelify   = require('babelify'),
  source     = require('vinyl-source-stream'),
  buffer     = require('vinyl-buffer'),
  sass       = require('gulp-sass'),
  clean      = require('gulp-clean'),
  uglify     = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps')
;

/*
* Delete javascript from the build directory
*/
gulp.task('clean-scripts', function() {
  gulp.src('public/**/*.js', {read: false})
    .pipe(clean());
});

/*
* Delete CSS from the build directory
*/
gulp.task('clean-css', function() {
  gulp.src('public/**/*.css', {read: false})
    .pipe(clean());
});

/*
* Delete HTML from the build directory
*/
gulp.task('clean-html', function() {
  gulp.src('build/**/*.html', {read: false})
    .pipe(clean());
});

/*
* Delete the contents of the build directory
*/
gulp.task('clean', function() {
  gulp.src('public', {read: false})
    .pipe(clean());
});

/*
 * Transpile es6 code to es5 using Babel and browserify
 */
gulp.task('transpile', ['clean-scripts'], function() {
  return browserify('source/js/main.js', { debug : true })
    .transform('babelify', { presets: ['es2015'] })
    .bundle()
    .on('error', function(err) {
      gutil.log(err.stack);
      this.emit('end');
    })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public'));
});

/*
 * Convert SASS files to CSS
 */
gulp.task('sass', ['clean-css'], function() {
  return gulp.src('source/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'));
});

/*
 * Copy HTML files over
 */
gulp.task('html', ['clean-html'], function() {
  return gulp.src('source/**/*.html')
    .pipe(gulp.dest('./public'));
});

/*
 * Watch for when JS, HTML, or SCSS files change so they can be updated
 */
gulp.task('watch', function() {
  gulp.watch('source/**/*.js', ['transpile']);
  gulp.watch('source/**/*.html', ['html']);
  gulp.watch('source/**/*.scss', ['sass']);
});

gulp.task('deploy', ['build'], function() {
  gulp.src('./*')
    .pipe(git.add())
    .pipe(git.commit('auto-deploy'));

  git.checkout('gh-pages', function(err) {
    gutil.log(err);
  });

  gulp.src('./public/*').pipe(gulp.dest('./', { overwrite: true }));

  git.push('origin', 'gh-pages', function(err) {
    gutil.log(err);
  });

  git.checkout('master', function(err) {
    gutil.log(err);
  });
});

gulp.task('build', ['sass', 'html', 'transpile']);
gulp.task('default', ['build', 'watch']);
