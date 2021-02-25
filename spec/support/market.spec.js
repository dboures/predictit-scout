var marketCtrl = require("../../server/controllers/market.controller.js");

describe("marketCtrl", () => {



    it("getState returns a promise", () => {
        expect(marketCtrl.getState(7055)).toBeInstanceOf(Promise); // TODO: actually figure out how to test this shit
    });

});