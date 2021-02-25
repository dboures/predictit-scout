var marketCtrl = require("../../server/controllers/market.controller.js");

describe("marketCtrl", () => {

    beforeEach(function() {
        spyOn(marketCtrl, 'makeRequest');
        spyOn(marketCtrl, 'parseStateFromResponse');
    });


    it("getState returns a promise", () => {
        expect(marketCtrl.getState(7055)).toBeInstanceOf(Promise); // TODO: actually figure out how to test this shit
    });

    it("getState calls makeRequest and parseStateFromResponse", () => {
        let result = marketCtrl.getState(7055);

        result.then(() => {
            expect(marketCtrl.makeRequest).toHaveBeenCalled();
            expect(marketCtrl.makeRequest).toHaveBeenCalled();
        }, (error) => {
            fail()
        });
    });

    // it("parseStateFromResponse will format the Predictit response properly", () => {
        
    // });
});