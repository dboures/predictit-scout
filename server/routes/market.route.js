const express = require('express');
const marketCtrl = require('../controllers/market.controller');

const router = express.Router();
module.exports = router;

router.get('/:id', function (req, res) { marketCtrl.getMarket(req, res) });