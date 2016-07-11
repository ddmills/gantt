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

        var workTypes = [
            `Tank Build`,
            `Change Over `,
            `Used Checklist`,
            `PTO shaft repair`,
            `scovil end on delivery hose`,
            `Repair overfill system.`,
            `Check air eliminator`,
            `Change manifold`,
            `Chassis repairs and test`,
            `PTO leak`,
            `Add Air Sparge`,
            `Repair #3 valve cable`,
            `Install pup suction line`,
            `Install 3in. Blackmer w/shaft drive`,
            `Check for leak on #3 pipe/valve`,
            `Rear lighting problem`,
            `C/S Accident Damage`,
            `Misc Tie up/ final prep/ changes`,
            `brake interlock bar assemble`,
            `s/s wreck damage`,
            `purge for rework`,
            `Replace Vic Clamp`,
            `Repair #4 pipe`,
            `Tank Removal `,
            `replace s/s front brake chamber`,
            `Build (9) pipes per sample`,
            `Add (2) ss baffles`,
            `Axle alignment and PM`,
            `Repair rear pump jack`,
            `Install printer in cab`,
            `Remove Tank From Chasis`,
            `Check hydrapak for leaks`,
            `Replace defective interlock valve`,
            `Weld in ss nipple for probe`,
            `Build 4 whip hose adapters`,
            `Repair light wiring`,
            `PM checklist`,
            `Modify hydraulics to whip hoses`,
            `Repair Base System`,
            `Replace bad end on center reel nozzle`,
            `leak repairs and 4th tie down`,
            `Final prep after paint`,
            `misc repairs`,
            `fuel tank leak repair`,
            `Replace latch on c/s reel door`,
            `Repair belly valve leaking by`,
            `Install BASE System`,
            `Repair leak on fuel tank`,
            `ABS Problem`,
            `Roper Pump Install At rear`
        ];

        var start = moment("2016-07-11", "YYYY-MM-DD").startOf('day').hour(8);

        for (var i = 0; i < num; i++) {
            var hour = underscore.random(0, 8 * 3);
            var duration = underscore.random(4, 8);
            var stageNo = underscore.random(1, 8);
            var status = underscore.sample(statuses);
            var workType = underscore.sample(workTypes);
            var progress = 0;

            if (status == 'active') {
                statuses = underscore.without(statuses, 'active');
            }

            if (status == 'active' || status == 'started') progress = underscore.random(1, duration - 1);

            var stage = new Stage({
                startDate: start,
                lockStartDate: false,
                duration: duration,
                orderNo: faker.random.number(),
                customer: faker.company.companyName(),
                workType: workType,
                progress: progress,
                stageNo: stageNo,
                status: status,
                bay: attributes.bay
            });

            start = business.addWorkingTime(start.clone(), duration, 'hours');
            stages.push(stage);
        }
        return stages;
    }

    seedBay3(bay)
    {
        var stages = [];

        stages.push(new Stage({
            startDate: moment("2016-07-11", "YYYY-MM-DD").startOf('day').hour(8),
            lockStartDate: false,
            duration: 8,
            orderNo: '000016',
            customer: 'LLL Transport',
            workType: 'Chassis DOT',
            progress: 3,
            stageNo: 1,
            status: 'ready',
            bay: bay
        }));

        stages.push(new Stage({
            startDate: moment("2016-07-11", "YYYY-MM-DD").startOf('day').hour(8),
            lockStartDate: false,
            duration: 16,
            orderNo: '000016',
            customer: 'LLL Transport',
            workType: 'Bottom Load Conversion',
            progress: 12,
            stageNo: 2,
            status: 'scheduled',
            bay: bay
        }));

        stages.push(new Stage({
            startDate: moment("2016-07-12", "YYYY-MM-DD").startOf('day').hour(8),
            lockStartDate: false,
            duration: 8,
            orderNo: '000003',
            customer: 'G3 PRICE CHECK',
            workType: 'Blower Install',
            progress: 0,
            stageNo: 5,
            status: 'ready',
            bay: bay
        }));

        return stages;
    }
}
