// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');

const notifs = require('./notifications/notifications');
require('./config/mongoose');

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`);

    let interval = 5000;
    setInterval(function() {
    console.log("I am doing my 5 second check"); // can put notif js here
    notifs.loadAllAlerts();
    }, interval);
  });
}

module.exports = app;
