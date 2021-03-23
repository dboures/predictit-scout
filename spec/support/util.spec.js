const jwt = require('jsonwebtoken');
const utils = require("../../server/utilities/utilities.js");
const fixture = require("./fixture.js");

describe("utils", () => {
    let res;
    beforeEach(() => {
        res = {
            status: function (s) { this.statusCode = s; return this; },
            send: function (m) { return this; }
        };
    });

    it("getTwitterHandleFromHeader will return error if auth is bad", () => {
        const value = utils.getTwitterHandleFromHeader(fixture.badMarketRequest, res);
        expect(value.statusCode).toEqual(401);
    });

    it("getTwitterHandleFromHeader will return handle if auth is good", () => {
        spyOn(jwt, 'verify').and.returnValue({ twitterHandle: 'handle' });

        const value = utils.getTwitterHandleFromHeader(fixture.marketRequest, res);
        expect(value).toEqual('handle');
    });

});