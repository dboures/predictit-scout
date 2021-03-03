const config = require('../../server/config/config.js');
const mongoose = require('mongoose');
const mongoTestUri = config.test_mongo.host;
const User = require('../../server/models/user.model');

const notifCtrl = require("../../server/controllers/notif.controller.js");
const fixture = require("./fixture.js");


describe("notifCtrl", () => {

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


});

describe("notifCtrl async specs", () => {
    beforeEach(() => {
        mongoose.connect(mongoTestUri, { 
            keepAlive: 1,
            useCreateIndex: true,
            useNewUrlParser: true, 
            useUnifiedTopology: true
          });
    });

    afterEach( async function() {
        let deleteResponse = await User.deleteMany({}, (error,result) => {
            if (error){
                fail();
            }
            return true;
        });
        expect(deleteResponse.ok).toBe(1);
    });

    it("getUser will retrieve the correct user", async function () {
        

        let u =  await User.insertMany([User(fixture.user1), User(fixture.user2)],
                    function (error) {expect(error).toBeNull();});

        let user = await notifCtrl.getUser('otherTwitterUser');
          
        expect(user.twitterHandle).toBe('otherTwitterUser');
        expect(user.twitterId_str).toBe('777663321');
        expect(user.hashedPassword).toBe('$2b$10$So1b3bnziF/uVMIjYrIHbu69lhU9Ob9zm0uGgFaXGDMiVVmuSrupq');
    });

    it("closeAlert will change openMarket field to false", async function () {

        let u =  await User.insertMany([User(fixture.user2)],
        function (error) {expect(error).toBeNull();});

        let alertToClose = {
            "marketId" : 6951,
            "contractName" : "Marty Walsh",
            "contractId" : 24372,
            "indicator" : "BestBuyNoCost",
            "operator" : ">",
            "limit" : 98,
            "openMarket" : true,
            "sent" : false,
            "marketName" : "Who will be the Senate-confirmed Secretary of Labor on Mar. 1?"
          };

        let beforeClosing = await User.find({});
        expect(beforeClosing[0].alerts).toEqual(fixture.user2.alerts);
        
        notifCtrl.closeAlert(alertToClose);
        setTimeout( async function () {
            let afterClosing = await User.find({});

            expect(afterClosing.alerts[0].openMarket.toBe(false));
        }, 5000);
    });

    it("findAlertstoSend will return if market is not found", () => {
        spyOn(notifCtrl, 'findAlertstoSend').and.callThrough();
        spyOn(notifCtrl, 'closeAlert').and.callThrough();

        setTimeout( async function () {
            let values = await notifCtrl.findAlertstoSend(fixture.invalidAlerts, fixture.marketStates);
        expect(values).toEqual([]);
        expect(notifCtrl.closeAlert).not.toHaveBeenCalled();
        expect(notifCtrl.findAlertstoSend).toHaveBeenCalled();
        }, 5000);
    });

    it("findAlertstoSend will call closeAlert if market is closed", () => {//TODO: im still a little suspicious
        spyOn(notifCtrl, 'findAlertstoSend').and.callThrough();
        spyOn(notifCtrl, 'closeAlert').and.callThrough();
        notifCtrl.closeAlert = jasmine.createSpy();

        setTimeout( async function () {
            let values = await notifCtrl.findAlertstoSend(fixture.closedAlerts, fixture.marketStates);

            expect(notifCtrl.findAlertstoSend).toHaveBeenCalled();
            expect(values).toEqual('no');
            expect(notifCtrl.closeAlert).toHaveBeenCalled();
            expect(notifCtrl.closeAlert).toHaveBeenCalledWith(fixture.closedAlerts[0]);
        }, 5000);

    });

});