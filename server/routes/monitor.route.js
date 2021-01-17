const express = require('express');
const asyncHandler = require('express-async-handler');
const monitorCtrl = require('../controllers/monitor.controller');

const router = express.Router();
module.exports = router;

router.get('/', function (req, res) {
  monitor(req, res);
});

// will want to post to add alerts to array in json
// router.post('/', function (req, res) {
//   monitor(req, res);
// });

// will want to put to update alerts to array in json
// router.put('/', function (req, res) {
//   monitor(req, res);
// });


// will want to delete to remove alerts to array in json
// router.delete('/', function (req, res) {
//   monitor(req, res);
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
  .get(asyncHandler(monitor));


function monitor(req, res) {
  // let status = monitorCtrl.monitor();
  // console.log(status)
  // res.send(status);
  monitorCtrl.monitor(req, res)
}