const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user.model');


module.exports = {
  monitor
}


function monitor(req, res) {
  console.log("The monitor function was called")
  const authHeader = req.headers.authorization
  if (authHeader.startsWith("Bearer ")){
    token = authHeader.substring(7, authHeader.length);
  } else {
    //pass
    return //res.status(200)
  }
  console.log(token)
  jwt.verify(token, config.jwtSecret, (err, verifiedJwt) => {
    if(err){
      console.log('error')
      console.log(err.message)
      res.status(200).send(err.message)
    } else {
      console.log(verifiedJwt.email)
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
        return res.status(200).send(user.fullname)
    }
);


  // return '71';
}

