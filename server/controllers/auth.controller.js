const jwt = require('jsonwebtoken');
const config = require('../config/config');


module.exports = {
  generateToken,
  sendResetLink
}


function generateToken(user) {
  const payload = JSON.stringify(user);
  return jwt.sign(payload, config.jwtSecret);
}

function sendResetLink(req, res) {
  console.log('in reset link');
  console.log(req);
  res.json({'goo': 'ga'});
}
