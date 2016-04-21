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
        var progresses = [
            'pending',
            'started',
            'ready',
            'active',
            'scheduled'
        ];

        for (var i = 0; i < num; i++) {
            var stage = new Stage({
                startDate: moment(),
                lockStartDate: false,
                duration: 4,
                orderNo: '123432',
                stageNo: '3',
                progress: underscore.sample(progresses),
                bay: attributes.bay
            });

            stages.push(stage);
        }
        return stages;
    }
}
