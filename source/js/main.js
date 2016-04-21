var
    BaySeeder = require('./seeders/BaySeeder'),
    moment = require('moment'),
    Vue    = require('vue')
;

var baySeeder = new BaySeeder();
var bays = baySeeder.seed(5);

Vue.component('stage', {
    props: ['stage', 'style'],
    template: '#stage-template',
    computed: {
        style: function() {
            var hours = this.stage.duration;
            var totalHour = this.$parent.range.asHours();
            var width = hours / totalHour * 100;

            var offset = moment.duration(this.stage.startDate.diff(this.$parent.startDate)).asHours();

            var left = offset / totalHour * 100;

            return {
                color: 'blue',
                width: width + '%',
                left: left + '%'
            };
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
            amount: 1,
            width: '10%'
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
            console.log(startUnit);

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
