const jwt = require('jsonwebtoken');
const alertCtrl = require("../../server/controllers/alert.controller.js");
const fixture = require("./fixture.js");
const User = require('../../server/models/user.model');

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

    it("loadAlerts calls findOneAndUpdate", () => {
        spyOn(jwt, 'verify').and.returnValue({ twitterHandle: 'handle' });
        spyOn(User, 'findOneAndUpdate');

        alertCtrl.saveAlerts(fixture.marketRequest, res);
        expect(User.findOneAndUpdate).toHaveBeenCalledWith(
            { twitterHandle: 'handle' },
            { alerts: 'req body here' },
            { new: true }, jasmine.any(Function));
    });

});