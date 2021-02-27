rawRequest = JSON.stringify({
    "id": 7085,
    "name": "Which party will win the U.S. Senate election in Ohio in 2022?",
    "shortName": "Which party will win the OH Senate race?",
    "image": "https://az620379.vo.msecnd.net/images/Markets/e03ef8e1-935f-48df-b68f-2c6a8b5e3bec.png",
    "url": "https://www.predictit.org/markets/detail/7085/Which-party-will-win-the-US-Senate-election-in-Ohio-in-2022",
    "contracts": [
      {
        "id": 24914,
        "dateEnd": "NA",
        "image": "https://az620379.vo.msecnd.net/images/Contracts/small_7ff9f1b5-ab35-4b51-a013-0629cd1eb09e.png",
        "name": "Republican",
        "shortName": "Republican",
        "status": "Open",
        "lastTradePrice": 0.77,
        "bestBuyYesCost": 0.78,
        "bestBuyNoCost": 0.23,
        "bestSellYesCost": 0.77,
        "bestSellNoCost": 0.22,
        "lastClosePrice": 0.77,
        "displayOrder": 0
      },
      {
        "id": 24915,
        "dateEnd": "NA",
        "image": "https://az620379.vo.msecnd.net/images/Contracts/small_0a6f9243-552a-4f7a-a253-088af5e83a68.png",
        "name": "Democratic",
        "shortName": "Democratic",
        "status": "Open",
        "lastTradePrice": 0.24,
        "bestBuyYesCost": 0.25,
        "bestBuyNoCost": 0.76,
        "bestSellYesCost": 0.24,
        "bestSellNoCost": 0.75,
        "lastClosePrice": 0.24,
        "displayOrder": 0
      }
    ],
    "timeStamp": "2021-02-26T12:05:47.33188",
    "status": "Open"
  });

marketObject = {
 id: 7085,
 name: 'Which party will win the U.S. Senate election in Ohio in 2022?',
 shortName: 'Which party will win the OH Senate race?',
 contracts: [
     {
     id: 24914,
     name: 'Republican',
     shortName: 'Republican',
     indicator: ''
     },
     {
     id: 24915,
     name: 'Democratic',
     shortName: 'Democratic',
     indicator: ''
     }
 ],
 isOpen: true
 };

stateObject = {
 id: 7085,
 name: 'Which party will win the U.S. Senate election in Ohio in 2022?',
 shortName: 'Which party will win the OH Senate race?',
 url: 'https://www.predictit.org/markets/detail/7085/Which-party-will-win-the-US-Senate-election-in-Ohio-in-2022',
 contracts: [
     {
     id: 24914,
     name: 'Republican',
     shortName: 'Republican',
     status: 'Open',
     lastTradePrice: 77,
     bestBuyYesCost: 78,
     bestBuyNoCost: 23,
     bestSellYesCost: 77,
     bestSellNoCost: 22,
     lastClosePrice: 77
     },
     {
     id: 24915,
     name: 'Democratic',
     shortName: 'Democratic',
     status: 'Open',
     lastTradePrice: 24,
     bestBuyYesCost: 25,
     bestBuyNoCost: 76,
     bestSellYesCost: 24,
     bestSellNoCost: 75,
     lastClosePrice: 24
     }
 ],
 isOpen: true
 }

marketRequest = {
    headers: {
        authorization: "Bearer 123457891011"
        },
    params: {
      id: '7085'
    },
    body: 'req body here'
}

badMarketRequest = {
    headers: {
        authorization: "junk 123457891011"
        }
}

exports.rawRequest = rawRequest;
exports.marketObject =  marketObject;
exports.stateObject = stateObject; 
exports.marketRequest = marketRequest;
exports.badMarketRequest = badMarketRequest;