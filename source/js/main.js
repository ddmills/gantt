var
    BaySeeder = require('./seeders/BaySeeder'),
    moment = require('moment'),
    Vue    = require('vue')
;

var baySeeder = new BaySeeder();
var bays = baySeeder.seed(5);

Vue.component('stage', {
    props: ['stage', 'style', 'progress'],
    template: '#stage-template',
    computed: {
        progress: function() {
            return Math.ceil(this.stage.progress/this.stage.duration * 10000)/100 + '%';
        },
        statusClass: function() {
            return `stage-status-${this.stage.status}`;
        },
        style: function() {
            var hours = this.stage.duration;
            var totalHour = this.$parent.range.asHours();
            var width = hours / totalHour * 100;

            var offset = moment.duration(this.stage.startDate.diff(this.$parent.startDate)).asHours();

            var left = offset / totalHour * 100;

            return {
                width: width + '%',
                left: left + '%'
            };
        }
    },
    methods: {
        dragStart: function(e) {
            e.dataTransfer.setDragImage(new Image(), 0, 0);
            // console.log('grab', e);
        },
        dragging: function(e) {
            var width = this.$parent.$el.offsetWidth;
            var offset = e.clientX - this.$parent.$el.offsetLeft;
            var range = this.$parent.range.asHours();

            if (offset > 0) {
                var hour = Math.ceil(range * (offset/width));
                this.stage.startDate = moment().hours(hour);
            }
        },
        dragEnd: function(e) {
            // console.log('release', e);
        }
    }
});

var vm = new Vue({
    el: '.stage-chart',
    data: {
        startDate: moment().startOf('day').hours(8),
        endDate: moment().add(1, 'day').startOf('day').hours(15),
        scale: {
            unit: 'hours',
            amount: 4,
            width: '12%'
        },
        bays: bays
    },
    computed: {
        range: function() {
            return moment.duration(this.endDate.diff(this.startDate));
        },
        cellStyle: function() {
            return {
                width: this.scale.width
            };
        },
        scaleCells: function() {
            var totalUnits = (this.range.as(this.scale.unit))/this.scale.amount;
            var startUnit = this.startDate[this.scale.unit]();

            var cells = [];

            for (var i = 0; i < totalUnits; i++) {
                var amount = (startUnit + (i * this.scale.amount)) % 24;

                cells.push({
                    'amount': amount + ':00'
                });
            }

            return cells;
        }
    }
});
