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
    createNotification(alert, currentMarkets);
  });
}

function getCurrentMarkets() {
  return State.find({}, 
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

function createNotification(alert, currentMarkets) {
  //match the alert to the specific market

  // console.log(alert.marketId);
  // console.log(currentMarkets);
  market = currentMarkets.filter(market => market.id == alert.marketId); // still gotta unpack this a bit

  console.log(alert);
  console.log(market);

  // check if current indicator value is operator the limit,
  // if so, create a notification,
  //otherwise pass

  //also if the market has closed without the alert being sent, send a closed market alert

}

// function loadAllAlerts() {
//     User.aggregate([
//       {$unwind: "$alerts"}, 
//       {$project : { _id: 0, alerts:1, email:1}}
//       ],
//       function (err, res) {
//       if (err) {} else {
//         console.log(res); 
//       } 
//     });
// }

//getting closer
// db.getCollection('users')


//the handle notifications workflow sketch


//making sure that the DB state reflects PI will be taken care of elsewhere


//get all users: User.distinct("email")

//for each user
//get the user's market
//compare it to state
// if criteria is met, create a notification, add the notif to the queue


//send all notifications
