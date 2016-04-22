var
    Stage      = require('../models/Stage'),
    moment     = require('moment'),
    underscore = require('underscore'),
    faker      = require('faker'),
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

module.exports = class StageSeeder
{
    seed(num = 4, attributes)
    {
        var stages = [];
        var statuses = [
            // 'pending',
            'started',
            'ready',
            'active',
            'scheduled'
        ];

        for (var i = 0; i < num; i++) {
            var hour = underscore.random(0, 8 * 3);
            var duration = underscore.random(4, 8);
            var stageNo = underscore.random(1, 8);
            var status = underscore.sample(statuses);

            var startDate = business.nextWorkingDay(moment().add(-1, 'days')).startOf('day').hour(8);
            startDate = business.addWorkingTime(startDate, hour, 'hours');

            var progress = 0;

            if (status == 'active') {
                statuses = underscore.without(statuses, 'active');
            }

            if (status == 'active' || status == 'started') progress = underscore.random(1, duration - 1);

            var stage = new Stage({
                startDate: startDate,
                lockStartDate: false,
                duration: duration,
                orderNo: faker.random.number(),
                customer: faker.company.companyName(),
                workType: faker.hacker.verb() + ' ' + faker.hacker.noun(),
                progress: progress,
                stageNo: stageNo,
                status: status,
                bay: attributes.bay
            });

            stages.push(stage);
        }
        return stages;
    }
}
