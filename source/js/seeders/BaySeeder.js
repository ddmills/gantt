var
    Bay = require('../models/Bay'),
    StageSeeder = require('../seeders/StageSeeder'),
    moment = require('moment')
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
                'name': `Bay-${i}`,
                'technicianCount': 1
            });

            bay.stages = this.stageSeeder.seed(4, {'bay': bay});
            bays.push(bay);
        }

        return bays;
    }
}
