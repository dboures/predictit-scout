const { ConsoleReporter } = require('jasmine');
const User = require('../models/user.model');

function loadAllAlerts() {
  //let res = [];
  console.log('running');

  // User.aggregate([{$unwind: "$alerts"}, {$project : { _id: 0, alerts:1}}]).
  //this the one that I need


  User.aggregate([{$project : { _id: 0, alerts:1}}]).
  then(function (res, err) {
    if (err) {
      comnsole.log('ya fucked up');
    } else{
      console.log('inside then');
      console.log(res); // [ { maxBalance: 98000 } ]   
    }
  });
  // console.log(.toArray());
  // User.aggregate([{$unwind: "$alerts"}, {$project : { _id: 0, alerts:1}}]).array.forEach(element => {
  //   res.push(element.alerts);
  // });

  //console.log(res);
  }


  loadAllAlerts();