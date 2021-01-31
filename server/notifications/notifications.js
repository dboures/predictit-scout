const User = require('../models/user.model');

module.exports = {
  loadAllAlerts
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
