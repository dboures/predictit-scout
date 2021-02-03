//const State = require('../models/State.model');
const User = require('../models/user.model');


module.exports = {
    syncMarketState
  }

function syncMarketState() {
    console.log('syncing market state');
    User.distinct("alerts.marketId", {"alerts.openMarket": true},
    function (err, res) {
        console.log(res); //niceuuuuuu
        }
    );


    // for marketId in marketIds:
    //     updateStateForMarket(marketId)
    //succ all these down to get "State", update some to closed if applicable, maybe notify users, but probably not


}

function updateStateForMarket(marketId) {

}