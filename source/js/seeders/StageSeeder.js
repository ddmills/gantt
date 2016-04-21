var
    Stage = require('../models/Stage'),
    moment = require('moment'),
    underscore = require('underscore')
;

module.exports = class StageSeeder
{
    constructor() {}
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
            var duration = underscore.random(1, 8);
            var progress = underscore.random(0, duration);

            console.log(progress/duration);

            var stage = new Stage({
                startDate: moment().hour(hour),
                lockStartDate: false,
                duration: duration,
                orderNo: '123432',
                progress: progress,
                stageNo: '3',
                status: underscore.sample(statuses),
                bay: attributes.bay
            });

            stages.push(stage);
        }
        return stages;
    }
}
