// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');
const marketState = require('./state/state');
const notifications = require('./notifications/notifications');
require('./config/mongoose');


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
    notifications.sendNotification('goo');
    }, 1 * interval);



  });
}

module.exports = app;
