const config = require('../config/config');
const stateModel = require('../models/state.model');
const User = require('../models/user.model');
const State = require('../models/state.model');

module.exports = {
  handleAllNotifications,
  sendNotification
}

async function handleAllNotifications(){
  console.log('handle');

  let currentMarkets = await getCurrentMarkets();
  let userAlerts = await getUserAlerts();
  
  // userAlerts.forEach(alert => {
  //   matchAlertAndMarket(alert, currentMarkets);
  // });

  let alertsToSend = findAlertstoSend(userAlerts, currentMarkets);

  //will delete when the latter works efficiently
  // alertsToSend.forEach(alert => {
  //   sendNotification(alert);
  // })

  // sendNotifications(alertsToSend);
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
    {$project : { alerts:'$alerts',_id: 0, alerts:1, twitterHandle:1 }},
    {$set : {"alerts.twitterHandle": "$twitterHandle" }},
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

function findAlertstoSend(userAlerts, currentMarkets) {
  //match the alert to the specific market
  let alertsToSend = [];
  userAlerts.forEach(alert => {
    let market = currentMarkets.find(market => market.id === alert.marketId);
    let contract = market.contracts.find(contract => Reflect.get(contract, 'id') === alert.contractId);
      if (contract === undefined){
        return
      }
      let marketVal = Reflect.get(contract, camelCase(alert.indicator));
  
    if ( alert.operator === '<') {
      if (marketVal < alert.limit){
        alertsToSend.push(alert);
      }
    }
    else if ( alert.operator === '>') {
      if (marketVal > alert.limit){
        alertsToSend.push(alert);
      }
    }
    else if ( alert.operator === '=') {
      if (marketVal === alert.limit){
        alertsToSend.push(alert);
      }
    }
  });
  return alertsToSend;
}

  //TODO: also if the market has closed without the alert being sent, send a closed market alert


function camelCase(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

async function sendNotification(alert) {
  //get twitter user id 
  let twitterId = await 

  console.log('after await');
  console.log(twitterId);


  // send the notification

}


  
  
//   ).then((response) => { 
//     return response.json().then((data) => {
//       return data;
//     })
//     .then((data) => { 
//       console.log('inside');
//       console.log(data.id);
//       return data.id});
// }

//send all notifications
