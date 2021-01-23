const express = require('express');
const asyncHandler = require('express-async-handler');
const alertCtrl = require('../controllers/alert.controller');

const router = express.Router();
module.exports = router;

router.get('/', function (req, res) { alertCtrl.loadAlerts(req, res) });
router.put('/', function (req, res) { alertCtrl.saveAlerts(req, res) });



//TODO: delete below, bc I think they are unnneccesary, DB will always just be updated to persist what you see on website.

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


