//which markets do we care about?
//query: User.distinct("alerts.marketId", {"alerts.openMarket": true})
//succ all these down to get "State", update some to closed if applicable, maybe notify users, but probably not