//const State = require('../models/State.model');
const User = require('../models/user.model');
const State = require('../models/state.model');
const marketCtrl = require('../controllers/market.controller');

module.exports = {
    syncMarketState
}

async function syncMarketState() {
    //get markets we care about from users
    let marketIds = await getMarketIds();

    //obtain updated market state information from PredictIt
    let marketStates = await Promise.all(
        marketIds.map(async marketId => {
            let marketState = await marketCtrl.getState(+marketId);
            return marketState;
            })
        );

    //update market states in the DB , 
    let syncedStates = await Promise.all(
        marketStates.map(async ms => {
            if (ms === undefined) {
                return
            } else {
                let syncedState = await State.findOneAndReplace(
                    { id: ms.id },
                    ms,
                    { upsert: true },
                    (err, res) => {
                        if (err) { } else {
                            return res
                        }
                    }
                )
                return syncedState;
            }
        })
    );

    //TODO: if any synced states closed (if we pull a market that is closed) all users should have it updated as closed
}

function getMarketIds() {
    return User.distinct("alerts.marketId", { "alerts.openMarket": true },
    function (err, res) {
        if (err) { return [] }
        else { return res }
        }   
    );
}
