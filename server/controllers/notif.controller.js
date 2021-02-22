const config = require('../config/config');
const User = require('../models/user.model');
const State = require('../models/state.model');
const fetch = require("node-fetch");
const crypto = require('crypto')
const oauthSignature = require("oauth-signature");

module.exports = {
  handleAllNotifications,
  sendResetKey
}

const messageUrl = "https://api.twitter.com/1.1/direct_messages/events/new.json";

async function handleAllNotifications(){
  console.log('handle');

  let currentMarkets = await getCurrentMarkets();
  let userAlerts = await getUserAlerts();
  let alertsToSend = findAlertstoSend(userAlerts, currentMarkets);
  sendNotifications(alertsToSend);
}

function getCurrentMarkets() {
  return State.find({},{_id:0}, 
    function (err, res) {
      if (err) { return [] }
      else { return res }
      }
    );
}

function getUserAlerts() {
  return User.aggregate([
    {$project : { alerts:'$alerts',_id: 0, alerts:1, twitterHandle:1, twitterId_str: 1 }},
    {$set : {"alerts.twitterHandle": "$twitterHandle" }},
    {$set : {"alerts.twitterId_str": "$twitterId_str" }},
    {$replaceWith : {arr :"$alerts"}},
    {$group : { "_id": null, result:{$push:"$arr"} } },
    { $unwind : "$result" },
    { $unwind : {"path": "$result", "includeArrayIndex":"ind" }},
    {$set : {"result.ind": "$ind" }},
    {$replaceWith : "$result"},
    {$match: {"sent":false}}
    ],
    function (err, res) {
      if (err) { return [] }
      else { return res }
      }
    );
}

function findAlertstoSend(userAlerts, currentMarkets) {
  //match the alert to the specific market
  let alertsToSend = [];
  userAlerts.forEach(alert => {
    let market = currentMarkets.find(market => market.id === alert.marketId);
    if (market === undefined){
      return
    }
    alert.url = market.url;
    if (!market.isOpen){
      closeAlert(alert);
      return 
    }

    let contract = market.contracts.find(contract => Reflect.get(contract, 'id') === alert.contractId);
      if (contract === undefined){
        return
      }
      let marketVal = Reflect.get(contract, camelCase(alert.indicator));
  
    if ( alert.operator === '<') {
      if (marketVal < alert.limit){
        alertsToSend.push(alert);
      }
    }
    else if ( alert.operator === '>') {
      if (marketVal > alert.limit){
        alertsToSend.push(alert);
      }
    }
    else if ( alert.operator === '=') {
      if (marketVal === alert.limit){
        alertsToSend.push(alert);
      }
    }
  });
  return alertsToSend;
}

function camelCase(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}


function sendNotifications(alerts) {
  alerts.forEach(alert => {
    requestOptions = generateMessageRequest(alert);
    fetch(messageUrl, requestOptions)
      .then(response => response.text())
      .then(result => {
        User.updateOne(
          { "twitterHandle": alert.twitterHandle},
          { $set: { [`alerts.${alert.ind}.sent`]: true }},
          (error, result) => {
            if (error) {
              console.log(error);
            }
          });
      })
      .catch(error => console.log('error', error)); 
  });
}

function closeAlert(alert) {
  User.updateOne(
    { "twitterHandle": alert.twitterHandle},
    { $set: { [`alerts.${alert.ind}.openMarket`]: false }},
    (error, result) => {
      if (error) {
        console.log(error);
      }
    });
}


async function sendResetKey(req, res) {
  handle = req.body.twitterHandle;
  if (handle === undefined){
    return
  }

  user = await getUser(handle);

  //create the secret
  try {
    let secret = user.hashedPassword + '-' + user.twitterId_str;
  } catch (error) {
    return res.status(404).send(error);
  }

  //send the secret to that user's twitter
  requestOptions = generateMessageRequest(user, secret);

  fetch(messageUrl, requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      return res.status(200).send();
    })
    .catch(error => {
      console.log('error', error);
      return res.status(500).send(error);
  });
}

async function getUser(handle){
  const user = await User.findOne({ twitterHandle: handle },
    (err, user) => {
      if (err) {
        return res.status(200).send(err);
      }
    });
    return user
}


  function generateMessageRequest(obj, reset = '') {
     //db - 1360038203667922945 - pi_scout-  1359741091092828162 - ed - 599018036
     let httpMethod = "POST";
 
     let nonce = crypto.randomBytes(32).toString('base64');
     nonce = nonce.replace(/\W/g, '');
 
     let timestamp = Math.round(Date.now() / 1000).toString();
 
     let parameters = {
       oauth_consumer_key : config.twitterConsumerKey,
       oauth_token : config.twitterAccessToken,
       oauth_nonce : nonce,
       oauth_timestamp : timestamp,
       oauth_signature_method : 'HMAC-SHA1',
       oauth_version : '1.0',
     }
 
     let signature = oauthSignature.generate(httpMethod, messageUrl, parameters, config.twitterConsumerKeySecret, config.twitterAccessTokenSecret);
 
     var myHeaders = new fetch.Headers();
     myHeaders.append("Authorization", "OAuth oauth_consumer_key=" + config.twitterConsumerKey + ",oauth_token=" +  config.twitterAccessToken + 
                       ",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=" + timestamp + ",oauth_nonce=" + nonce + ",oauth_version=\"1.0\",oauth_signature=" + signature);
     myHeaders.append("Content-Type", "application/json");

     if (reset.length > 0){
      message = "A password reset has been requested. Please use the following key to reset your password:\n\n" + reset;
     }
     else {
      message = "Hello " + obj.twitterHandle + ",\n\nOne of your alerts has been activated:\n\n" +  "Market:\n" + obj.marketName +  "\n\nContract:\n" + obj.contractName + "\n\nCondition:\n" +
      obj.indicator + " " + obj.operator + " " + obj.limit + "\n\nAccess the market here: " + obj.url +  "\n\nHappy Trading!";
     }
     
     var message_body = JSON.stringify({"event":{"type":"message_create","message_create":{"target":{"recipient_id":obj.twitterId_str},"message_data":{"text":message}}}});
     
     var requestOptions = {
       method: httpMethod,
       headers: myHeaders,
       body: message_body,
       redirect: 'follow'
     };

     return requestOptions;
  }

  