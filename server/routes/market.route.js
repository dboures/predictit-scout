const express = require('express');
const passport = require('passport');
const marketCtrl = require('../controllers/market.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.get('/:id', function (req, res) { marketCtrl.getMarket(req, res) });