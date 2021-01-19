const express = require('express');
const asyncHandler = require('express-async-handler');
const marketCtrl = require('../controllers/market.controller');

const router = express.Router();
module.exports = router;

router.get('/', function (req, res) { marketCtrl.getMarket(req, res) });