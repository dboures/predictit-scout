const jwt = require('jsonwebtoken');
const marketCtrl = require("../../server/controllers/market.controller.js");
const fixture = require("./fixture.js");

describe("marketCtrl", () => {

    beforeEach(function () {
        spyOn(marketCtrl, 'makeRequest').and.returnValue(Promise.resolve(fixture.rawRequest));
    });

    it("getState returns a promise", () => {
        expect(marketCtrl.getState(7085)).toBeInstanceOf(Promise);
    });

    it("getState calls 3 other functions", () => {
        spyOn(marketCtrl, 'parseStateFromResponse');
        spyOn(marketCtrl, 'getCompleteContracts');

        let result = marketCtrl.getState(7085);
        result.then(() => {
            expect(marketCtrl.makeRequest).toHaveBeenCalled();
            expect(marketCtrl.parseStateFromResponse).toHaveBeenCalled();
            expect(marketCtrl.getCompleteContracts).toHaveBeenCalled();
        }, (error) => {
            fail()
        });
    });

    it("parseStateFromResponse will format the PredictIt response properly", () => {
        let result = marketCtrl.parseStateFromResponse(fixture.rawRequest);
        expect(result).toEqual(fixture.stateObject);
    });

    it("parseMarketFromResponse will format the PredictIt response properly", () => {
        let result = marketCtrl.parseStateFromResponse(fixture.rawRequest);
        expect(result).toEqual(fixture.stateObject);
    });

    it("getMarket will return error if auth is bad", () => {
        let res = {
            status: function (s) { this.statusCode = s; return this; },
            send: function (m) { return this; }
        };
        const value = marketCtrl.getMarket(fixture.badMarketRequest, res);
        expect(value.statusCode).toEqual(401);
    });

    it("getMarket will verify user, make request, and return promise", () => {
        spyOn(jwt, 'verify').and.returnValue(true);

        let res = {
            status: function (s) { this.statusCode = s; return this; },
            send: function (m) { return this; }
        };
        const value = marketCtrl.getMarket(fixture.marketRequest, res);
        expect(value).toBeInstanceOf(Promise);
        value.then(() => {
            expect(jwt.verify).toHaveBeenCalled();
            expect(marketCtrl.makeRequest).toHaveBeenCalled();
        }, (error) => {
            fail()
        });
    });
});
