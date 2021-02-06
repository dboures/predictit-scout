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
    console.log(alert);
    createNotif/update(alert)
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
    {$unwind: "$alerts"},
    {$project : { _id: 0, alerts:1, email:1}}],
    function (err, res) {
      if (err) { return [] }
      else { return res }
      }
    );
}

function createNotification(alert, currentMarkets) {
  //match the alert to the specific market

  // check if current indicator value is operator the limit,
  // if so, create a notification,
  //otherwise pass

  //also if the market has close, change the user's contract market isOpen bool? -> then maybe we only want to pull ones that are open

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
