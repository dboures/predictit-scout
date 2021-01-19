const jwt = require('jsonwebtoken');
const config = require('../config/config');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

module.exports = {
    getMarket
}


function getMarket(req, res) {
    const authHeader = req.headers.authorization
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7, authHeader.length);
    } else { res.status(401).send('Unauthorized') }
  
    jwt.verify(token, config.jwtSecret, (err, verifiedJwt) => {
      if (err) {
        res.status(200).send(err.message)
      } else {
        //get Market here
        const base_url = "https://www.predictit.org/api/marketdata/markets/";
        const url = base_url.concat('7054') // Todo: figure out best practice for this
        console.log(url)

        let xhttp = createCORSRequest('GET', url);
        xhttp.send();      
        




        userEmail = verifiedJwt.email;
      }
    })
    return userEmail
}


function createCORSRequest(method, url){
    let xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        // XHR has 'withCredentials' property only if it supports CORS
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){ // if IE use XDR
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
      }
  };
    return xhr;
}
