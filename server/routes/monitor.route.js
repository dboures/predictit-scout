const express = require('express');
const asyncHandler = require('express-async-handler');
const monitorCtrl = require('../controllers/monitor.controller');

const router = express.Router();
module.exports = router;

router.get('/', function(req, res) {
    res.send(monitor(req,res))
});

router.route('/')
  .get(asyncHandler(monitor));


async function monitor(req, res) {
  let status = monitorCtrl.monitor();
  res.json(status);// no clue what status will be
}