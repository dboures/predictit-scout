const stateModel = require('../models/state.model');
const User = require('../models/user.model');
const State = require('../models/state.model');

module.exports = {
  handleAllNotifications
}

async function handleAllNotifications(){
  console.log('handle');

  let currentMarkets = await getCurrentMarkets();
  let userAlerts = await getUserAlerts();
  
  userAlerts.forEach(alert => {
    matchAlertAndMarket(alert, currentMarkets);
  });
}

function getCurrentMarkets() {
  return State.find({},{_id:0}, 
    function (err, res) {
      if (err) { return [] }
      else { return res }
      }
    );
}

function getUserAlerts() {
  return User.aggregate([
    {$project : { alerts:'$alerts',_id: 0, alerts:1, email:1 }},
    {$set : {"alerts.email": "$email" }},
    {$replaceWith : {arr :"$alerts"}},
    {$group : { "_id": null, result:{$push:"$arr"} } },
    { $unwind : "$result" },
    { $unwind : "$result" },
    {$replaceWith : "$result"}
    ],
    function (err, res) {
      if (err) { return [] }
      else { return res }
      }
    );
}

function matchAlertAndMarket(alert, currentMarkets) {
  //match the alert to the specific market

  console.log(alert.marketId);
  let market = currentMarkets.find(market => market.id === alert.marketId);
  let contract = market.contracts.find(contract => Reflect.get(contract, 'id') === alert.contractId);
    if (contract === undefined){
      return
    }
    let marketVal = Reflect.get(contract, camelCase(alert.indicator));

    console.log(marketVal);
    console.log(alert.operator);
    console.log(alert.limit);

  if ( alert.operator === '<') {
    if (marketVal < alert.limit){
      console.log('less than notif')
      //createNotification(alert);
    }
  }
  else if ( alert.operator === '>') { // TODO: test
    if (marketVal > alert.limit){
      console.log('gtr than notif')
      //createNotification(alert);
    }
  }
  else if ( alert.operator === '=') { // TODO: test
    if (marketVal === alert.limit){
      console.log('equals Notif')
      //createNotification(alert);
    }
  }

  //TODO: also if the market has closed without the alert being sent, send a closed market alert

}

function camelCase(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function createNotification(alert) {
  console.log('gonna create then send text');
}

//send all notifications
