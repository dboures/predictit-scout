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
      const base_url = "https://www.predictit.org/api/marketdata/markets/";
      const url = base_url.concat('7054') // Todo: figure out best practice for this, not sure if it's in request header or what
      console.log(url);
      //
      makeRequest(url)
        .then(function (response) {
          // console.log(response);
          let marketObject = parseMarketFromResponse(response); 
          return res.status(200).send(marketObject);
        })
        .catch(function (err) {
          console.log('Something went wrong', err);
          return res.status(200).send(err);
        });
    }
  })
}



async function makeRequest(url) {

  // Create the XHR request
  let request = new XMLHttpRequest();

  // Return it as a Promise
  return new Promise(function (resolve, reject) {

    // Setup our listener to process compeleted requests
    request.onreadystatechange = function () {

      // Only run if the request is complete
      if (request.readyState !== 4) return;

      // Process the response
      if (request.status >= 200 && request.status < 300) {
        // If successful
        //console.log(this.responseText);
        resolve(request.responseText);
      } else {
        // If failed
        reject({
          status: request.status,
          statusText: request.statusText
        });
      }

    };

    // Setup our HTTP request
    request.open('GET', url, true);

    // Send the request
    request.send();

  });
};

function parseMarketFromResponse(response) {
  let market = JSON.parse(response);
  //handle contracts
  let contracts = market.contracts
  // console.log(contracts[0])
  let newContracts = [];
  contracts.forEach(function (contract) {
    // console.log(contract.id)
    let newContract = {
      "id": contract.id,
      "name": contract.name,
      "shortName": contract.shortName,
      "indicator": ''
    };
    newContracts.push(newContract);
  });
  market.contracts = newContracts;

  //handle everything else
  delete market.timeStamp;
  delete market.image;
  delete market.url;
  if (market.status === 'Open'){
    market.isOpen = true;
  } else {
    market.isOpen = false;
  }
  delete market.status;
  // console.log(market)

  return market
}




