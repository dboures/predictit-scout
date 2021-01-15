const jwt = require('jsonwebtoken');
const config = require('../config/config');


module.exports = {
  monitor
}


function monitor() {
  console.log("The monitor function was called")
  return new Promise(function(resolve, reject){
      resolve(71);
  });
}
