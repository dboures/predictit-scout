const User = require('../models/user.model');

function loadAllAlerts() {
  //let res = [];
  console.log('running');

  // User.aggregate([{$unwind: "$alerts"}, {$project : { _id: 0, alerts:1}}]).
  //this the one that I need


  User.aggregate([
    {$project : { _id: 0, alerts:1}}
    ],
    function (res, err) {
    if (err) {
      console.log('ya fucked up');
    }
      console.log('we did it');
      console.log(res); // [ { maxBalance: 98000 } ]   
  });

  //console.log(res);
  }


  loadAllAlerts();