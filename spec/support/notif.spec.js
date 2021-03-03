const config = require('../../server/config/config.js');
const mongoose = require('mongoose');
const nock = require('nock');
const mongoTestUri = config.test_mongo.host;
const User = require('../../server/models/user.model');
const State = require('../../server/models/state.model');
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
    beforeEach((done) => {
        mongoose.connect(mongoTestUri, { 
            keepAlive: 1,
            useCreateIndex: true,
            useNewUrlParser: true, 
            useUnifiedTopology: true
          });
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

    it("findAlertstoSend will return if market is not found", async function() {
        let values = await notifCtrl.findAlertstoSend(fixture.invalidAlerts, fixture.marketStates);
        expect(values).toEqual([]);
    });

    it("getUserAlerts will find only unsent alerts and will include alerts with a closed market", async function () { // TODO
        //alerts with a closed market should stay until dismissed by users
        let u =  await User.insertMany([User(fixture.user2), User(fixture.user3)],
                    function (error) {expect(error).toBeNull();});
        
        let allAlerts = await notifCtrl.getUserAlerts();

        expect(allAlerts.length).toBe(3);
        expect(allAlerts[0].marketId).toBe(6951);
        expect(allAlerts[0].twitterHandle).toBe('otherTwitterUser');
        expect(allAlerts[0].indicator).toBe('BestBuyNoCost');
        expect(allAlerts[0].operator).toBe('>');
        expect(allAlerts[0].limit).toBe(98);
        expect(allAlerts[0].openMarket).toBe(true);
        expect(allAlerts[0].sent).toBe(false);
        expect(allAlerts[0].marketName).toBe('Who will be the Senate-confirmed Secretary of Labor on Mar. 1?');
        expect(allAlerts[0].twitterId_str).toBe('777663321');
        expect(allAlerts[0].ind).toBe(1); //ind is the index of alert in user array

        expect(allAlerts[1].marketId).toBe(7035);
        expect(allAlerts[1].twitterHandle).toBe('thirdUser');
        expect(allAlerts[1].ind).toBe(0);

        expect(allAlerts[2].marketId).toBe(6951);
        expect(allAlerts[2].twitterHandle).toBe('thirdUser');
        expect(allAlerts[2].openMarket).toBe(false);
        expect(allAlerts[2].ind).toBe(1);
    });

    it("getCurrentMarkets will pull all markets", async function () {
        let u =  await State.insertMany([State(fixture.marketStates[0]), State(fixture.marketStates[1])],
                    function (error) {expect(error).toBeNull();});

        let markets = await notifCtrl.getCurrentMarkets();

        expect(markets.length).toBe(2);
        expect(markets[0].id).toBe(7035);
        expect(markets[1].id).toBe(6951);
        expect(markets[1].isOpen).toBe(false);

        let deleteResponse = await State.deleteMany({}, (error,result) => {
            if (error){
                fail();
            }
            return true;
        });
        expect(deleteResponse.ok).toBe(1);
    });

    it("sendResetKey will send a request to the twitter api", async function (done) {
        nock('https://api.twitter.com/1.1')
            .post('/direct_messages/events/new.json')
            .reply(200, {reply: 'message sent'});

        spyOn(notifCtrl, 'generateMessageRequest').and.returnValue({
            method: 'POST',
            headers: {},
            body: {},
            redirect: 'follow'
          });

        let res = {
                sent:false,
                status: function (s) { this.statusCode = s; return this; },
                send: function (m) { this.sent =  true; return this; }
            };

        let u =  await User.insertMany([User(fixture.user1)],
                    function (error) {expect(error).toBeNull();});
    
        await notifCtrl.sendResetKey(fixture.sendResetKey, res);

        expect(res.statusCode).toBe(200);
        expect(res.sent).toBe(true);
        done();
    });
});