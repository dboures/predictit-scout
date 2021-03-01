//import * as notifModule from "../../server/controllers/notif.controller.js";
const notifCtrl = require("../../server/controllers/notif.controller.js");
const fixture = require("./fixture.js");

// SomeModule.functionToTest().toBe('mockedCorrectly')

describe("notifCtrl", () => {

    it("findAlertstoSend will return if market is not found", () => {
        spyOn(notifCtrl, 'findAlertstoSend').and.callThrough();
        spyOn(notifCtrl, 'closeAlert');

        let values = notifCtrl.findAlertstoSend(fixture.invalidAlerts, fixture.marketStates);
        expect(values).toEqual([]);
        expect(notifCtrl.closeAlert).not.toHaveBeenCalled();
        expect(notifCtrl.findAlertstoSend).toHaveBeenCalled();
    });

    // it("findAlertstoSend will call closeAlert if market is closed", () => {
    //     spyOn(notifCtrl, 'findAlertstoSend').and.callThrough();
    //     spyOn(notifCtrl, 'closeAlert').and.callThrough();
    //     notifCtrl.closeAlert = jasmine.createSpy();

    //     let values = notifCtrl.findAlertstoSend(fixture.closedAlerts, fixture.marketStates);
        
    //     expect(notifCtrl.findAlertstoSend).toHaveBeenCalled();
    //     expect(values).toEqual('no');
    //     expect(notifCtrl.closeAlert).toHaveBeenCalled();
    //     expect(notifCtrl.closeAlert).toHaveBeenCalledWith(fixture.closedAlerts[0]);
    // });

    it("findAlertstoSend will push proper alerts with < operator", () => {
        let values = notifCtrl.findAlertstoSend(fixture.lessThanAlerts, fixture.marketStates);
        expect(values).toEqual([fixture.lessThanAlerts[1]])
    });

    it("findAlertstoSend will push proper alerts with = operator", () => {
        let values = notifCtrl.findAlertstoSend(fixture.equalAlerts, fixture.marketStates);
        expect(values).toEqual([fixture.equalAlerts[1]])
    });

    it("findAlertstoSend will push proper alerts with > operator", () => {
        let values = notifCtrl.findAlertstoSend(fixture.greaterThanAlerts, fixture.marketStates);
        expect(values).toEqual([fixture.greaterThanAlerts[0]])
    });


    it("getTwitterId makes a GET request to twitter", () => {
        let value = userCtrl.getTwitterId('twitterUser');
        expect(value).toBeInstanceOf(Promise);
        value.then((result) => {
            expect(result).toEqual('13177568');
        }, (error) => {
            fail()
        });
    });

});