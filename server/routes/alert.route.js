const express = require('express');
const asyncHandler = require('express-async-handler');
const alertCtrl = require('../controllers/alert.controller');

const router = express.Router();
module.exports = router;

router.get('/load', function (req, res) {
  loadAlerts(req, res);
});

// will want to post to add alerts to array in json
// router.post('/', function (req, res) {
//   alert(req, res);
// });

// will want to put to update alerts to array in json
// router.put('/', function (req, res) {
//   alert(req, res);
// });


// will want to delete to remove alerts to array in json
// router.delete('/', function (req, res) {
//   alert(req, res);
// });


// db.update({'Searching criteria goes here'},
// {
//  $push : {
//     trk :  {
//              "lat": 50.3293714,
//              "lng": 6.9389939
//            } //inserted data is the object to be inserted 
//   }
// });

router.route('/')
  .get(asyncHandler(loadAlerts));


function loadAlerts(req, res) {
  // let status = alertCtrl.alert();
  // console.log(status)
  // res.send(status);
  alertCtrl.loadAlerts(req, res)
}