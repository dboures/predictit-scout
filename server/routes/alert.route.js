const express = require('express');
const passport = require('passport');
const alertCtrl = require('../controllers/alert.controller');

const router = express.Router();
module.exports = router;
router.use(passport.authenticate('jwt', { session: false }))

router.get('/', function (req, res) { alertCtrl.loadAlerts(req, res) });
router.put('/', function (req, res) { alertCtrl.saveAlerts(req, res) });
router.get('/updates', function (req, res) { alertCtrl.handleUpdates(req,res) });
