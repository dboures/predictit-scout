const stateModel = require('../models/state.model');
const User = require('../models/user.model');
const State = require('../models/state.model');
const fetch = require("node-fetch");

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

  let market = currentMarkets.find(market => market.id === alert.marketId);
  let contract = market.contracts.find(contract => Reflect.get(contract, 'id') === alert.contractId);
    if (contract === undefined){
      return
    }
    let marketVal = Reflect.get(contract, camelCase(alert.indicator));

  if ( alert.operator === '<') {
    if (marketVal < alert.limit){
      console.log('less than notif')
      sendNotification(alert);
    }
  }
  else if ( alert.operator === '>') {
    if (marketVal > alert.limit){
      console.log('gtr than notif')
      sendNotification(alert);
    }
  }
  else if ( alert.operator === '=') {
    if (marketVal === alert.limit){
      console.log('equals Notif')
      sendNotification(alert);
    }
  }

  //TODO: also if the market has closed without the alert being sent, send a closed market alert

}

function camelCase(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function sendNotification(alert) {

  //get twitter user id 
  fetch('https://api.twitter.com/1.1/users/show.json?screen_name=twitterdev', {
    method: 'GET',
    headers: {
    'Content-Type': 'text/plain',
    'X-My-Custom-Header': 'value-v',
    'Authorization': 'Bearer ' + config.twitterBearer, //'Bearer ' + token,
    }
  }).then(response => response.json()
  ).then(data => console.log(data.id));


  // send the notification

}

//send all notifications
