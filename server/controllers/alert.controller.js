const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user.model');


module.exports = {
  loadAlerts,
  saveAlerts
}


function loadAlerts(req, res) {
  const userEmail = getAccountEmailFromHeader(req, res);

  User.findOne({ email: userEmail },
    (err, user) => {
      if (err) return res.status(200).send(err)
      return res.status(200).send(user.alerts)
    }
  );
}

function saveAlerts(req, res) {
  const userEmail = getAccountEmailFromHeader(req, res);
  //TODO: DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodify
  User.findOneAndUpdate(
    { email: userEmail },
    { alerts: req.body },
    { new: true },

    (err, user) => {
      if (err) return res.status(200).send(err)
      return res.status(200).send(user.alerts)
    }
  );
}

function getAccountEmailFromHeader(req, res) {
  const authHeader = req.headers.authorization
  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7, authHeader.length);
  } else { res.status(401).send('Unauthorized') }

  jwt.verify(token, config.jwtSecret, (err, verifiedJwt) => {
    if (err) {
      res.status(200).send(err.message)
    } else {
      userEmail = verifiedJwt.email
    }
  })
  return userEmail
}
