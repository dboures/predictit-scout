const utils = require('../utilities/utilities.js');
const User = require('../models/user.model');

module.exports = {
  loadAlerts,
  saveAlerts
}

function loadAlerts(req, res) {
  const userHandle = utils.getTwitterHandleFromHeader(req, res);
  return User.findOne({ twitterHandle: userHandle },
    (error, user) => {
      if (error) return res.status(200).send(error) 
      return res.status(200).send(user.alerts);
    }
  );
}

function saveAlerts(req, res) {
  if (req.body.length > 3){
    return res.status(401).send('Unauthorized')
  }
  const userHandle = utils.getTwitterHandleFromHeader(req, res);
  return User.findOneAndUpdate(
    { twitterHandle: userHandle },
    { alerts: req.body },
    { new: true },
    (error, user) => {
      if (error) return res.status(200).send(error)
      return res.status(200).send(user.alerts)
    }
  );
}


