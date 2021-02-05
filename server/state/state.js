//const State = require('../models/State.model');
const User = require('../models/user.model');
const State = require('../models/state.model');
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

    let marketStates = await Promise.all(
        marketIds.map(async marketId => {
            let marketState = await marketCtrl.getState(+marketId);
            return marketState;
        }));
    

    let syncedStates = await Promise.all(
        marketStates.map(async ms => {
            let syncedState = await State.findOneAndReplace(
                { id: ms.id},
                ms,
                { upsert: true },
                (err, res) => {
                    if (err) { } else {
                        console.log(ms.id);
                        console.log('success');
                        return res
                    }
                  }
            ).catch((e) => {
                console.log(e); //TODO: what happens when websited log to console?
            })
            return syncedState;
        }));
}
    // upsert market maybe
    // for marketId in marketIds:
    //     updateStateForMarket(marketId)
    //succ all these down to get "State", update some to closed if applicable, maybe notify users, but probably not
