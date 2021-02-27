const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user.model');


module.exports = {
  loadAlerts,
  saveAlerts,
  getTwitterHandleFromHeader
}


function loadAlerts(req, res) {
  const userHandle = getTwitterHandleFromHeader(req, res);
  User.findOne({ twitterHandle: userHandle },
    (error, user) => {
      if (error) return res.status(200).send(error)
      return res.status(200).send(user.alerts)
    }
  );
}

function saveAlerts(req, res) {
  const userHandle = getTwitterHandleFromHeader(req, res);
  User.findOneAndUpdate(
    { twitterHandle: userHandle },
    { alerts: req.body },
    { new: true },

    (error, user) => {
      if (error) return res.status(200).send(error)
      return res.status(200).send(user.alerts)
    }
  );
}

function getTwitterHandleFromHeader(req, res) {
  const authHeader = req.headers.authorization
  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7, authHeader.length);
  } else { return res.status(401).send('Unauthorized') }

  try {
    let verifiedJwt = jwt.verify(token, config.jwtSecret);
    userHandle = verifiedJwt.twitterHandle;
    return userHandle;
  }
  catch (error) {
    return res.status(200).send(error.message);
  }
}
