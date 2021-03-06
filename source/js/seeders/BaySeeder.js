var
    Bay         = require('../models/Bay'),
    StageSeeder = require('../seeders/StageSeeder'),
    moment      = require('moment'),
    underscore  = require('underscore'),
    faker       = require('faker')
;

module.exports = class BaySeeder
{
    constructor()
    {
        this.stageSeeder = new StageSeeder();
    }

    seed(num = 4)
    {
        var bays = [];

        for (var i = 0; i < num; i++) {
            var bay = new Bay({
                'shop': 'Service',
                'name': `Bay-${i + 1}`,
                'technicianCount': 1
            });

            var stageCount = underscore.random(3, 8);

            bay.stages = this.stageSeeder.seed(stageCount, {'bay': bay});
            bays.push(bay);
        }

        return bays;
    }
}
