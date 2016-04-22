var
    Stage = require('../models/Stage'),
    moment = require('moment'),
    underscore = require('underscore'),
    faker = require('faker')
;

module.exports = class StageSeeder
{
    seed(num = 4, attributes)
    {
        var stages = [];
        var statuses = [
            'pending',
            'started',
            'ready',
            'active',
            'scheduled'
        ];

        for (var i = 0; i < num; i++) {
            var hour = underscore.random(8, 24);
            var duration = underscore.random(2, 8);
            var stageNo = underscore.random(1, 8);
            var status = underscore.sample(statuses);
            var progress = 0;

            if (status == 'active') {
                statuses = underscore.without(statuses, 'active');
            }

            if (status == 'active' || status == 'started') progress = underscore.random(1, duration - 1);

            var stage = new Stage({
                startDate: moment().hour(hour),
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
