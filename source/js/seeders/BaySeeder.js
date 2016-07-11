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

    seed(num = 3)
    {
        var bays = [];

        var bay = new Bay({
            'shop': 'Service',
            'name': `Bay: 1`,
            'technicianCount': 1
        });

        bay.stages = this.stageSeeder.seed(5, {'bay': bay});
        bays.push(bay);

        var bay = new Bay({
            'shop': 'Service',
            'name': `Bay: 3`,
            'technicianCount': 1
        });

        bay.stages = this.stageSeeder.seedBay3(bay);
        bays.push(bay);

        var bay = new Bay({
            'shop': 'Service',
            'name': `Bay: Service Outside`,
            'technicianCount': 1
        });

        bay.stages = this.stageSeeder.seed(4, {'bay': bay});
        bays.push(bay);

        return bays;
    }
}
