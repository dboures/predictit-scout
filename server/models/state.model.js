const mongoose = require('mongoose');

//Will this just make another collection?

const StateSchema = new mongoose.Schema({
  marketId : {
      type: Number,
      required: true,
      unique: true
  },
  contracts: {
    type: Array,
    default:[]
  }


}, {
  versionKey: false
});


module.exports = mongoose.model('State', StateSchema);
