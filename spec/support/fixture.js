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

resetPassword = {
  body: {
      changekey: "oldHash-5944518036",
      password: "newPass"
      }
}

lessThanAlerts = [
  {
    "marketId" : 7035,
    "contractName" : "Will Benjamin Netanyahu be prime minister of Israel on June 30, 2021?",
    "contractId" : 24678,
    "indicator" : "BestBuyYesCost",
    "operator" : "<",
    "limit" : 2,
    "openMarket" : true,
    "sent" : false,
    "marketName" : "Will Benjamin Netanyahu be prime minister of Israel on June 30, 2021?",
    "twitterHandle" : "twitterUser",
    "twitterId_str" : "13622945",
    "ind" : 1
  },
  {
    "marketId" : 7035,
    "contractName" : "Will Benjamin Netanyahu be prime minister of Israel on June 30, 2021?",
    "contractId" : 24678,
    "indicator" : "BestBuyYesCost",
    "operator" : "<",
    "limit" : 80,
    "openMarket" : true,
    "sent" : false,
    "marketName" : "Will Benjamin Netanyahu be prime minister of Israel on June 30, 2021?",
    "twitterHandle" : "twitterUser",
    "twitterId_str" : "13622945",
    "ind" : 2
  }
]
equalAlerts = [
  {
    "marketId" : 7035,
    "contractName" : "Will Benjamin Netanyahu be prime minister of Israel on June 30, 2021?",
    "contractId" : 24678,
    "indicator" : "lastTradePrice",
    "operator" : "=",
    "limit" : 55,
    "openMarket" : true,
    "sent" : false,
    "marketName" : "Will Benjamin Netanyahu be prime minister of Israel on June 30, 2021?",
    "twitterHandle" : "twitterUser",
    "twitterId_str" : "13622945",
    "ind" : 3
  },
  {
    "marketId" : 7035,
    "contractName" : "Will Benjamin Netanyahu be prime minister of Israel on June 30, 2021?",
    "contractId" : 24678,
    "indicator" : "lastTradePrice",
    "operator" : "=",
    "limit" : 70,
    "openMarket" : true,
    "sent" : false,
    "marketName" : "Will Benjamin Netanyahu be prime minister of Israel on June 30, 2021?",
    "twitterHandle" : "twitterUser",
    "twitterId_str" : "13622945",
    "ind" : 4
  }
]
greaterThanAlerts = [
  {
    "marketId" : 7035,
    "contractName" : "Will Benjamin Netanyahu be prime minister of Israel on June 30, 2021?",
    "contractId" : 24678,
    "indicator" : "bestBuyNoCost",
    "operator" : ">",
    "limit" : 20,
    "openMarket" : true,
    "sent" : false,
    "marketName" : "Will Benjamin Netanyahu be prime minister of Israel on June 30, 2021?",
    "twitterHandle" : "twitterUser",
    "twitterId_str" : "13622945",
    "ind" : 6
  },
  {
    "marketId" : 7035,
    "contractName" : "Will Benjamin Netanyahu be prime minister of Israel on June 30, 2021?",
    "contractId" : 24678,
    "indicator" : "bestBuyNoCost",
    "operator" : ">",
    "limit" : 55,
    "openMarket" : true,
    "sent" : false,
    "marketName" : "Will Benjamin Netanyahu be prime minister of Israel on June 30, 2021?",
    "twitterHandle" : "twitterUser",
    "twitterId_str" : "13622945",
    "ind" : 5
  }
]
closedAlerts = [
  {
    "marketId" : 6951,
    "contractName" : "Marty Walsh",
    "contractId" : 24372,
    "indicator" : "BestBuyNoCost",
    "operator" : ">",
    "limit" : 98,
    "openMarket" : true,
    "sent" : false,
    "marketName" : "Who will be the Senate-confirmed Secretary of Labor on Mar. 1?",
    "twitterHandle" : "twitterUser",
    "twitterId_str" : "13622945",
    "ind" : 7
}
]

invalidAlerts = [
  {
    "marketId" : 1234,
    "contractName" : "invalid",
    "contractId" : 67890,
    "indicator" : "BestBuyNoCost",
    "operator" : ">",
    "limit" : 98,
    "openMarket" : true,
    "sent" : false,
    "marketName" : "Who will be the champion?",
    "twitterHandle" : "twitterUser",
    "twitterId_str" : "13622945",
    "ind" : 7
}
]

marketStates = [
  {
  "contracts" : [ 
      {
          "id" : 24678,
          "name" : "Will Benjamin Netanyahu be prime minister of Israel on June 30, 2021?",
          "shortName" : "Netanyahu Israeli PM on 6/30?",
          "status" : "Open",
          "lastTradePrice" : 70,
          "bestBuyYesCost" : 71,
          "bestBuyNoCost" : 30,
          "bestSellYesCost" : 70,
          "bestSellNoCost" : 29,
          "lastClosePrice" : 70
      }
  ],
  "id" : 7035,
  "name" : "Will Benjamin Netanyahu be prime minister of Israel on June 30, 2021?",
  "shortName" : "Netanyahu Israeli PM on 6/30?",
  "url" : "https://www.predictit.org/markets/detail/7035/Will-Benjamin-Netanyahu-be-prime-minister-of-Israel-on-June-30,-2021",
  "isOpen" : true
  },
  {
    "contracts" : [
        {
            "id" : 24372,
            "name" : "Marty Walsh",
            "shortName" : "Walsh",
            "status" : "Open",
            "lastTradePrice" : 1,
            "bestBuyYesCost" : 1,
            "bestBuyNoCost" : 0,
            "bestSellYesCost" : 0,
            "bestSellNoCost" : 99,
            "lastClosePrice" : 1
        },
        {
            "id" : 24619,
            "name" : "Rahm Emanuel",
            "shortName" : "Emanuel",
            "status" : "Open",
            "lastTradePrice" : 1,
            "bestBuyYesCost" : 1,
            "bestBuyNoCost" : 0,
            "bestSellYesCost" : 0,
            "bestSellNoCost" : 99,
            "lastClosePrice" : 1
        }
    ],
    "id" : 6951,
    "name" : "Who will be the Senate-confirmed Secretary of Labor on Mar. 1?",
    "shortName" : "Secretary of Labor on Mar. 1?",
    "url" : "https://www.predictit.org/markets/detail/6951/Who-will-be-the-Senate-confirmed-Secretary-of-Labor-on-Mar-1",
    "isOpen" : false
  }
]

user1 = {
  "alerts" : [],
  "roles" : [],
  "twitterHandle" : "twitterUser",
  "twitterId_str" : "5944518036",
  "hashedPassword" : "oldHash"
}

user2 = {
  "alerts" : [],
  "roles" : [],
  "twitterHandle" : "otherTwitterUser",
  "twitterId_str" : "777663321",
  "hashedPassword" : "$2b$10$So1b3bnziF/uVMIjYrIHbu69lhU9Ob9zm0uGgFaXGDMiVVmuSrupq"
}

noIdUser = {
  "twitterHandle" : "noIdTwitterUser",
  "twitterId_str" : "",
  "password" : "password",
  "repeatPassword" : "password"
}

exports.rawRequest = rawRequest;
exports.marketObject =  marketObject;
exports.stateObject = stateObject; 
exports.marketRequest = marketRequest;
exports.badMarketRequest = badMarketRequest;
exports.resetPassword = resetPassword;
exports.lessThanAlerts = lessThanAlerts;
exports.greaterThanAlerts = greaterThanAlerts;
exports.equalAlerts = equalAlerts;
exports.closedAlerts = closedAlerts;
exports.invalidAlerts = invalidAlerts;
exports.marketStates = marketStates;
exports.user1 = user1;
exports.user2 = user2;
exports.noIdUser = noIdUser;