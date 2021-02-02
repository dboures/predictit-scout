const User = require('../models/user.model');

module.exports = {
  handleAllNotifications,
  loadAllAlerts
}

function handleAllNotifications(){
  loadAllAlerts();
}

function loadAllAlerts() {
    User.aggregate([
      {$unwind: "$alerts"}, 
      {$project : { _id: 0, alerts:1, email:1}}
      ],
      function (err, res) {
      if (err) {} else {
        console.log(res); // [ { maxBalance: 98000 } ]  
      } 
    });
}


//the handle notifications workflow sketch


//which markets do we care about?
//query: User.distinct("alerts.marketId", {"alerts.openMarket": true})
//succ all these down to get "State", update some to closed if applicable, maybe notify users, but probably not


//for each user
//get the user's market
//compare it to state
// if criteria is met, create a notification, add the notif to the queue


//send all notifications
