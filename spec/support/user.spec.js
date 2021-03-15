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
    beforeEach((done) => {
        mongoose.connect(mongoTestUri, { 
            keepAlive: 1,
            useCreateIndex: true,
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        nock('https://api.twitter.com/1.1')
            .get('/users/show.json?screen_name=noIdTwitterUser')
            .reply(200, {id_str: '13177568'});
        done();
        });
    afterEach( async function(done) {
        let deleteResponse = await User.deleteMany({}, (error,result) => {
            if (error){
                fail();
            }
            return true;
        });
        expect(deleteResponse.ok).toBe(1);
        done();
    });

    it('userCtrl insert should save to the database without original password', async function () {
		expect(fixture.noIdUser.password).toEqual('password');

		let ins = await userCtrl.insert(fixture.noIdUser);
		
		let result = await User.find({});

		expect(result.length).toBe(1);
        expect(result[0].twitterId_str).toBe('13177568');
        expect(result[0].hashedPassword).not.toBe('password');
        expect(result[0].password).toBeUndefined();
        expect(result[0].alerts.length).toBe(0);
	});  

    it('userCtrl reset password should reset the correct users password', async function () {
        let res = {
            status: function (s) { this.statusCode = s; return this; },
            send: function (m) { return this; }
        };

		let u =  await User.insertMany([User(fixture.user1), User(fixture.user2)],
                    function (error) {expect(error).toBeNull();});

        let oldUsers = await User.find({}, (error,result) => {
            if(error){
                fail();
            }
            return result;
        });

        let reset =  await userCtrl.resetPassword(fixture.resetPassword, res);

        // get users
        let users = await User.find({}, (error,result) => {
            if(error){
                fail();
            }
            return result;
        });

        // expectations
        expect(oldUsers.length).toBe(2);
        expect(oldUsers[0].twitterHandle).toBe('twitterUser');
        expect(oldUsers[0].twitterId_str).toBe('5944518036');
        expect(oldUsers[0].hashedPassword).toBe('oldHash');
        expect(oldUsers[0].alerts.length).toBe(0);
        
        expect(oldUsers[1].twitterHandle).toBe('otherTwitterUser');
        expect(oldUsers[1].twitterId_str).toBe('777663321');
        expect(oldUsers[1].hashedPassword).toBe('$2b$10$So1b3bnziF/uVMIjYrIHbu69lhU9Ob9zm0uGgFaXGDMiVVmuSrupq');
        expect(oldUsers[1].alerts.length).toBe(2);

        expect(users.length).toBe(2);
        expect(users[0].twitterHandle).toBe('twitterUser');
        expect(users[0].twitterId_str).toBe('5944518036');
        expect(users[0].hashedPassword).not.toBe('oldHash');
        expect(users[0].alerts.length).toBe(0);

        expect(oldUsers[1].twitterHandle).toBe('otherTwitterUser');
        expect(oldUsers[1].twitterId_str).toBe('777663321');
        expect(oldUsers[1].hashedPassword).toBe('$2b$10$So1b3bnziF/uVMIjYrIHbu69lhU9Ob9zm0uGgFaXGDMiVVmuSrupq');
        expect(oldUsers[1].alerts.length).toBe(2);
    });	
});