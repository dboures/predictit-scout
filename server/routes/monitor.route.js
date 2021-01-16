const { ControlContainer } = require('@angular/forms');
const express = require('express');
const asyncHandler = require('express-async-handler');
const { nextTick } = require('process');
const monitorCtrl = require('../controllers/monitor.controller');

const router = express.Router();
module.exports = router;

router.get('/', function (req, res) {
  monitor(req, res);

});

router.route('/')
  .get(asyncHandler(monitor));


function monitor(req, res) {
  let status = monitorCtrl.monitor();
  console.log(status)
  res.send(status);
}