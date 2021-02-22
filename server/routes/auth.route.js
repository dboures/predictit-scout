const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const notifCtrl = require('../controllers/notif.controller');
const config = require('../config/config');

const router = express.Router();
module.exports = router;

router.post('/register', asyncHandler(register), login);
router.post('/login', passport.authenticate('local', { session: false }), login);
router.post('/resetKey',  function (req, res) { notifCtrl.sendResetKey(req, res) });
router.post('/reset',  function (req, res) { resetPassword(req, res) });
router.get('/me', passport.authenticate('jwt', { session: false }), login);


async function register(req, res, next) {
  let user = await userCtrl.insert(req.body);
  user = user.toObject();
  delete user.hashedPassword;
  req.user = user;
  next()
}

async function resetPassword(req, res) {
  let user = await userCtrl.resetPassword(req.body);
  delete user.hashedPassword;
  console.log(user); // need to figure out what return should be so i can do front end correctly
  res.json({ user });
}

function login(req, res) {
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}
