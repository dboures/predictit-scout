const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user.model');


module.exports = {
  loadAlerts
}


function loadAlerts(req, res) {
  const authHeader = req.headers.authorization
  if (authHeader.startsWith("Bearer ")){
    token = authHeader.substring(7, authHeader.length);
  } else { return res.status(401) } // unauthorized

  jwt.verify(token, config.jwtSecret, (err, verifiedJwt) => {
    if(err){
      res.status(200).send(err.message)
    } else {
      userEmail = verifiedJwt.email
    }
  })

  User.findOne(
    // query
    {email: userEmail},

    // Only return an object with the "name" and "owner" fields. "_id" 
    // is included by default, so you'll need to remove it if you don't want it.
    // {name: true, owner: true},

    // callback function
    (err, user) => {
        if (err) return res.status(200).send(err)
        console.log(user.alerts)
        return res.status(200).send(user.alerts)
    }
);


  // return '71';
}

