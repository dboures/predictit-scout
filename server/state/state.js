//const State = require('../models/State.model');
const User = require('../models/user.model');
const marketCtrl = require('../controllers/market.controller');


module.exports = {
    syncMarketState
  }

async function syncMarketState() {
    marketIds = await User.distinct("alerts.marketId", {"alerts.openMarket": true},
    function (err, res) {
        if (err) { return []}
        else { return res }
        }
    );


    // marketIds.forEach( async (marketId) => {
    //     let x = await marketCtrl.getState(+marketId);
    //     console.log(x);
    // })

    let x = await Promise.all( //TODO: better naming
        marketIds.map(async marketId => {
            let state = await marketCtrl.getState(+marketId);
            console.log(state);
            return state;
        }));
    console.log(x);

    // let films = await Promise.all(
    // characterResponseJson.films.map(async filmUrl => {
    //     let filmResponse = await fetch(filmUrl)
    //     return filmResponse.json()
    // })

}
    // upsert market maybe
    // for marketId in marketIds:
    //     updateStateForMarket(marketId)
    //succ all these down to get "State", update some to closed if applicable, maybe notify users, but probably not
