const userCtrl = require("../../server/controllers/user.controller.js");
const fixture = require("./fixture.js");
const User = require('../../server/models/user.model');
const nock = require('nock');

describe("userCtrl", () => {
    beforeEach(() => {
        nock('https://api.twitter.com/1.1')
          .get('/users/show.json?screen_name=twitterUser')
          .reply(200, {id_str: '13177568'});
      });

    it("resetPassword calls updateOne", () => {
        spyOn(User,'updateOne');
        let res = {
            status: function (s) { this.statusCode = s; return this; },
            send: function (m) { return this; } // want this to have something
        };

        userCtrl.resetPassword(fixture.resetPassword, res);
        expect(User.updateOne).toHaveBeenCalledWith( 
            { hashedPassword: 'oldHash', twitterId_str: '123456' },
            { $set: { hashedPassword: jasmine.any(String) }},
            jasmine.any(Function));
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