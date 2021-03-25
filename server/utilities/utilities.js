const jwt = require('jsonwebtoken');
const config = require('../config/config');
var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

module.exports = {
    getTwitterHandleFromHeader,
    emitter
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