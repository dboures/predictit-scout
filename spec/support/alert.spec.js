const jwt = require('jsonwebtoken');
const alertCtrl = require("../../server/controllers/alert.controller.js");
const config = require('../../server/config/config.js');
const fixture = require("./fixture.js");
const User = require('../../server/models/user.model');
const mongoose = require('mongoose');
const mongoTestUri = config.test_mongo.host;

describe("alertCtrl", () => {
    let res;
    beforeEach(() => {
        res = {
            status: function (s) { this.statusCode = s; return this; },
            send: function (m) { return this; }
        };
    });

    it("getTwitterHandleFromHeader will return error if auth is bad", () => {
        const value = alertCtrl.getTwitterHandleFromHeader(fixture.badMarketRequest, res);
        expect(value.statusCode).toEqual(401);
    });

    it("getTwitterHandleFromHeader will return handle if auth is good", () => {
        spyOn(jwt, 'verify').and.returnValue({ twitterHandle: 'handle' });

        const value = alertCtrl.getTwitterHandleFromHeader(fixture.marketRequest, res);
        expect(value).toEqual('handle');
    });

    it("loadAlerts calls findOne", () => {
        spyOn(jwt, 'verify').and.returnValue({ twitterHandle: 'handle' });
        spyOn(User, 'findOne');

        alertCtrl.loadAlerts(fixture.marketRequest, res);
        expect(User.findOne).toHaveBeenCalledWith(
            { twitterHandle: 'handle' },
            jasmine.any(Function));
    });

    it("saveAlerts calls findOneAndUpdate", () => {
        spyOn(jwt, 'verify').and.returnValue({ twitterHandle: 'handle' });
        spyOn(User, 'findOneAndUpdate');

        alertCtrl.saveAlerts(fixture.marketRequest, res);
        expect(User.findOneAndUpdate).toHaveBeenCalledWith(
            { twitterHandle: 'handle' },
            { alerts: fixture.marketRequest.body },
            { new: true }, jasmine.any(Function));
    });
});


describe("alertCtrl async specs", () => {
    let res;
    beforeEach(() => {
        res = {
            alerts: [],
            status: function (s) { this.statusCode = s; return this; },
            send: function (m) { this.alerts = m; return this; }
        };
    });

    it("loadAlerts finds the right user", async function () {
        mongoose.connect(mongoTestUri, { 
            keepAlive: 1,
            useCreateIndex: true,
            useNewUrlParser: true, 
            useUnifiedTopology: true
          });

        spyOn(jwt, 'verify').and.returnValue({ twitterHandle: 'otherTwitterUser' });
        spyOn(User, 'findOne').and.callThrough();

		let u =  await User.insertMany([User(fixture.user1), User(fixture.user2)],
                     function (error) {expect(error).toBeNull();});

        let results = await alertCtrl.loadAlerts(fixture.marketRequest, res);
        expect(User.findOne).toHaveBeenCalledWith(
            { twitterHandle: 'otherTwitterUser' },
            jasmine.any(Function));

        expect(results.alerts.length).toBe(2);
        expect(results.alerts[0]).toEqual(fixture.user2.alerts[0]);
        expect(results.alerts[1]).toEqual(fixture.user2.alerts[1]);

        let deleteResponse = await User.deleteMany({}, (error,result) => {
            if (error){
                fail();
            }
            return true;
        });

        expect(deleteResponse.ok).toBe(1);
    });

    it("saveAlerts updates the alert field on the given user", async function () {
        mongoose.connect(mongoTestUri, { 
            keepAlive: 1,
            useCreateIndex: true,
            useNewUrlParser: true, 
            useUnifiedTopology: true
          });

        spyOn(jwt, 'verify').and.returnValue({ twitterHandle: 'otherTwitterUser' });
        spyOn(User, 'findOneAndUpdate').and.callThrough();

        let u =  await User.insertMany([User(fixture.user1), User(fixture.user2)],
                     function (error) {expect(error).toBeNull();});

        let saved = await User.find({}, function (error, result) {
            expect(error).toBeNull();
            return result;
        });

        expect(saved.length).toBe(2);
        expect(saved[0].twitterHandle).toBe('twitterUser');
        expect(saved[0].twitterId_str).toBe('5944518036');
        expect(saved[0].hashedPassword).toBe('oldHash');
        expect(saved[0].alerts.length).toBe(0);
        
        expect(saved[1].twitterHandle).toBe('otherTwitterUser');
        expect(saved[1].twitterId_str).toBe('777663321');
        expect(saved[1].hashedPassword).toBe('$2b$10$So1b3bnziF/uVMIjYrIHbu69lhU9Ob9zm0uGgFaXGDMiVVmuSrupq');
        expect(saved[1].alerts.length).toBe(2);

        let results = await alertCtrl.saveAlerts(fixture.marketRequest, res);
        expect(User.findOneAndUpdate).toHaveBeenCalledWith(
            { twitterHandle: 'otherTwitterUser' },
            { alerts: fixture.marketRequest.body },
            { new: true }, jasmine.any(Function));

        expect(results.alerts.length).toBe(1);
        expect(results.alerts).toEqual(fixture.marketRequest.body);

        let deleteResponse = await User.deleteMany({}, (error,result) => {
            if (error){
                fail();
            }
            return true;
        });

        expect(deleteResponse.ok).toBe(1);
    }); 

});