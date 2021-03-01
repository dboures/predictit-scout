const userCtrl = require("../../server/controllers/user.controller.js");
const config = require('../../server/config/config.js');
const fixture = require("./fixture.js");
const User = require('../../server/models/user.model');
const nock = require('nock');
const mongoose = require('mongoose');
const mongoTestUri = config.test_mongo.host;

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
            send: function (m) { return this; }
        };

        userCtrl.resetPassword(fixture.resetPassword, res);
        expect(User.updateOne).toHaveBeenCalledWith( 
            { hashedPassword: 'oldHash', twitterId_str: '5944518036' },
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

describe("userCtrl async specs", () => { 
    beforeEach(() => {
    nock('https://api.twitter.com/1.1')
      .get('/users/show.json?screen_name=noIdTwitterUser')
      .reply(200, {id_str: '13177568'});
  });
    it('userCtrl insert should save to the database without original password', async function () {
        mongoose.connect(mongoTestUri, { 
            keepAlive: 1,
            useCreateIndex: true,
            useNewUrlParser: true, 
            useUnifiedTopology: true
          });

		spyOn(userCtrl, 'insert').and.callThrough();
		spyOn(userCtrl, 'getTwitterId').and.callThrough()

		expect(fixture.noIdUser.password).toEqual('password');
		let ins = await userCtrl.insert(fixture.noIdUser);
		
		let result = await User.find({});

		expect(result.length).toBe(1);
        expect(result[0].twitterId_str).toBe('13177568');
        expect(result[0].hashedPassword).not.toBe('password');
        expect(result[0].password).toBeUndefined();
        expect(result[0].alerts.length).toBe(0);

        let deleteResponse = await User.deleteMany({}, (error,result) => {
            if (error){
                fail();
            }
            return true;
        });

        expect(deleteResponse.ok).toBe(1);
	});  

    it('userCtrl reset password should reset the correct users password', async function () {
        mongoose.connect(mongoTestUri, { 
                keepAlive: 1,
                useCreateIndex: true,
                useNewUrlParser: true, 
                useUnifiedTopology: true
              });

		spyOn(userCtrl, 'resetPassword').and.callThrough();
        let res = {
            status: function (s) { this.statusCode = s; return this; },
            send: function (m) { return this; }
        };

		let u1 =  await User(fixture.user1).save(function (error) {expect(error).toBeNull();});

        let oldUsers = await User.find({}, (error,result) => {
            if(error){
                fail();
            }
            return result;
        });

        let reset = userCtrl.resetPassword(fixture.resetPassword, res);

        // get users
        let users = await User.find({}, (error,result) => {
            if(error){
                fail();
            }
            return result;
        });

        // expectations
        expect(oldUsers[0].twitterHandle).toBe('twitterUser');
        expect(oldUsers[0].twitterId_str).toBe('5944518036');
        expect(oldUsers[0].hashedPassword).toBe('oldHash');
        expect(oldUsers[0].alerts.length).toBe(0);

        expect(users[0].twitterHandle).toBe('twitterUser');
        expect(users[0].twitterId_str).toBe('5944518036');
        expect(users[0].hashedPassword).not.toBe('oldHash');
        expect(users[0].alerts.length).toBe(0);
				

        let deleteResponse = await User.deleteMany({}, (error,result) => {
            if (error){
                fail();
            }
            return true;
        });

        expect(deleteResponse.ok).toBe(1);
        });

});