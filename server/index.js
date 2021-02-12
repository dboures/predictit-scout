// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');
const marketState = require('./state/state');
const notifications = require('./notifications/notifications');
require('./config/mongoose');

function sendNotification() {
  console.log('sending');


  //curl --request GET --url 'https://api.twitter.com/1.1/users/show.json?screen_name=twitterdev' --header 'authorization: Bearer AAAAAAAAAAAAAAAAAAAAACbJMgEAAAAAv1anfBevJkBu5GUr4Lw5Uo0sne4%3D8vY8PnigQ3pmuXwUs08pPHG0wTTQ32SqqzBOVAUVY3mtoSd9u7'
  //get twitter user id -> 
  fetch('https://api.twitter.com/1.1/users/show.json?screen_name=twitterdev', {
    method: 'GET',
    headers: {
    'Content-Type': 'text/plain',
    'X-My-Custom-Header': 'value-v',
    'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAACbJMgEAAAAAv1anfBevJkBu5GUr4Lw5Uo0sne4%3D8vY8PnigQ3pmuXwUs08pPHG0wTTQ32SqqzBOVAUVY3mtoSd9u7', //'Bearer ' + token,
    }
  }).then(response => response.json()
  ).then(data => console.log(data));


  // send the notification

}
// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`);

    //TODO: cleanup and investigate best practices
    let interval = 5000;
    // setInterval(function() {
    // console.log("Handle notifications (15 seconds)");
    // notifications.handleAllNotifications();
    // }, 5 * interval);

    // setInterval(function() {
    //   console.log("Update state (minute)");
    //   marketState.syncMarketState();
    //   }, 1 * interval);


    setInterval(function() {;
    sendNotification();
    }, 1 * interval);



  });
}

module.exports = app;
