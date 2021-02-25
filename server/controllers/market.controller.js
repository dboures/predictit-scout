const jwt = require('jsonwebtoken');
const config = require('../config/config');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

module.exports = {
  getMarket,
  getState,
  makeRequest,
  parseStateFromResponse
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
      const marketId = req.params.id;
      const base_url = "https://www.predictit.org/api/marketdata/markets/";
      const url = base_url.concat(marketId)
      makeRequest(url)
        .then(function (response) {
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

function getState(marketId) {

  const base_url = "https://www.predictit.org/api/marketdata/markets/";
  const url = base_url.concat(marketId);
  let result = makeRequest(url)
    .then(function (response) {
      let stateObject = parseStateFromResponse(response);
      return stateObject;
    })
    .catch(function (err) {
      console.log('Something went wrong', err);
      return ;
    });
  
    return result;
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
  market.contracts = getPartialContracts(market);
  return cleanResponse(market)
}


function parseStateFromResponse(response) {
  let state = JSON.parse(response);
  state.contracts = getCompleteContracts(state);
  return cleanResponse(state, false)
  
}

function getCompleteContracts(state) {
  let contracts = state.contracts
  let newContracts = [];
  contracts.forEach(function (contract) {
    let newContract = {
      "id": contract.id,
      "name": contract.name,
      "shortName": contract.shortName,
      "status": contract.status,
      "lastTradePrice": contract.lastTradePrice * 100,
      "bestBuyYesCost": contract.bestBuyYesCost * 100,
      "bestBuyNoCost": contract.bestBuyNoCost * 100,
      "bestSellYesCost": contract.bestSellYesCost * 100,
      "bestSellNoCost": contract.bestSellNoCost * 100,
      "lastClosePrice": contract.lastClosePrice * 100,
      
    };
    newContracts.push(newContract);
  });
  return newContracts
}

function getPartialContracts(market) {
  let contracts = market.contracts
  let newContracts = [];
  contracts.forEach(function (contract) {
    let newContract = {
      "id": contract.id,
      "name": contract.name,
      "shortName": contract.shortName,
      "indicator": ''
    };
    newContracts.push(newContract);
  });
  return newContracts
}

function cleanResponse(response, deleteUrl = true) {
  delete response.timeStamp;
  delete response.image;
  if (deleteUrl){
    delete response.url;
  }
  if (response.status === 'Open'){
    response.isOpen = true;
  } else {
    response.isOpen = false;
  }
  delete response.status;
  return response
}



