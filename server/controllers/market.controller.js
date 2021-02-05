const jwt = require('jsonwebtoken');
const config = require('../config/config');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

module.exports = {
  getMarket,
  getState
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
      console.log(marketId);
      const base_url = "https://www.predictit.org/api/marketdata/markets/";
      const url = base_url.concat(marketId)
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

  return market
}


function parseStateFromResponse(response) {
  let state = JSON.parse(response);
  //handle contracts
  let contracts = state.contracts
  // console.log(contracts[0])
  let newContracts = [];
  contracts.forEach(function (contract) {
    // console.log(contract.id)
    let newContract = {
      "id": contract.id,
      "name": contract.name,
      "shortName": contract.shortName,
      "status": contract.status,
      "lastTradePrice": contract.lastTradePrice,
      "bestBuyYesCost": contract.bestBuyYesCost,
      "bestBuyNoCost": contract.bestBuyNoCost,
      "bestSellYesCost": contract.bestSellYesCost,
      "bestSellNoCost": contract.bestSellNoCost,
      "lastClosePrice": contract.lastClosePrice,
      
    };
    newContracts.push(newContract);
  });
  state.contracts = newContracts;

  //handle everything else
  delete state.timeStamp;
  delete state.image;
  delete state.url;
  if (state.status === 'Open'){
    state.isOpen = true;
  } else {
    state.isOpen = false;
  }
  delete state.status;

  return state
}




