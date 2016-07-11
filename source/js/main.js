var
    BaySeeder = require('./seeders/BaySeeder'),
    moment    = require('moment'),
    Vue       = require('vue'),
    Business  = require('serious-business-time')
;

var business = Business.createInstance(moment,{
    0: null,
    1: ['08:00:00', '16:00:00'],
    2: ['08:00:00', '16:00:00'],
    3: ['08:00:00', '16:00:00'],
    4: ['08:00:00', '16:00:00'],
    5: ['08:00:00', '16:00:00'],
    6: null
});

var baySeeder = new BaySeeder();
var bays = baySeeder.seed();

Vue.component('stage', {
    props: ['stage', 'style', 'progress', 'clickOffset'],
    template: '#stage-template',
    computed: {
        progress: function() {
            return Math.ceil(this.stage.progress/this.stage.duration * 10000)/100;
        },
        statusClass: function() {
            return `stage-status-${this.stage.status}`;
        },
        style: function() {
            var hours = this.stage.duration;
            var totalHour = this.$parent.workingDays * 8;
            var width = hours / totalHour * 100;

            var diff = business.workingDiff(this.stage.startDate, this.$parent.startDate, 'hours');
            var left = diff / totalHour * 100;

            return {
                width: width + '%',
                left: left + '%'
            };
        }
    },
    methods: {
        handleClick: function(e) {
        },
        dragStart: function(e) {
            var mouseOffset = e.clientX - (this.$parent.$el.offsetLeft + 320)
            var elOffset = e.target.offsetLeft;
            this.clickOffset = mouseOffset - elOffset;
            e.dataTransfer.setDragImage(new Image(), 0, 0);
        },
        dragging: function(e) {
            var width = this.$parent.$el.offsetWidth - 323;
            var offset = (e.clientX - this.clickOffset) - this.$parent.$el.offsetLeft - 320;
            var range = this.$parent.workingDays * 8;

            if (offset > 0) {
                var hour = Math.round(range * (offset/width));
                this.stage.startDate = business.addWorkingTime(this.$parent.startDate, hour, 'hours');
            }
        },
        dragEnd: function(e) {
        }
    }
});

var vm = new Vue({
    el: '.stage-chart',
    data: {
        startDate: moment().startOf('day').hours(8),
        endDate: moment().add(8, 'day').startOf('day').hours(15),
        bays: bays
    },
    computed: {
        range: function() {
            return moment.duration(this.endDate.diff(this.startDate));
        },
        workingDays: function() {
            var days = [];
            var totalDays = this.range.as('days');

            for (var i = 0; i < totalDays; i++) {
                var day = this.startDate.clone().startOf('day').hours(0).add(i, 'days');
                if (business.isWorkingDay(day)) {
                    days++;
                }
            }

            return days;
        },
        dayCells: function() {
            var days = [];
            var totalDays = this.range.as('days');

            for (var i = 0; i < totalDays; i++) {
                var day = this.startDate.clone().startOf('day').hours(0).add(i, 'days');
                if (business.isWorkingDay(day)) {
                    days.push(day);
                }
            }

            return days;
        },
        hourCells: function() {
            return ['8:00', '12:00'];
        },
        hourStyle: function() {
            return {
                width: '50%',
                maxWidth: '50%',
            };
        },
    },
    methods: {
        autoSchedule: function(bay) {
            var start = new moment().startOf('day').hours(8);

            for (var stage of bay.stages) {
                if (stage.status == 'active') {
                    // start = business.subtractWorkingTime(start, stage.progress, 'hours');
                    stage.startDate = start.clone();
                    start = business.addWorkingTime(stage.startDate, stage.duration, 'hours');
                }
            }

            for (var stage of bay.stages) {
                if (stage.status == 'started') {
                    // start = business.subtractWorkingTime(start, stage.progress, 'hours');
                    stage.startDate = start.clone();
                    start = business.addWorkingTime(stage.startDate, stage.duration, 'hours');
                }
            }

            for (var stage of bay.stages) {
                if (stage.status == 'ready') {
                    stage.startDate = start.clone();
                    start = business.addWorkingTime(stage.startDate, stage.duration, 'hours');
                }
            }

            for (var stage of bay.stages) {
                if (stage.status == 'scheduled') {
                    stage.startDate = start.clone();
                    start = business.addWorkingTime(stage.startDate, stage.duration, 'hours');
                }
            }
        },
    }
});
