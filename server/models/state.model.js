const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
  marketId : {
      type: Number,
      required: true
  },
  //rest of market state representation here
  //can apparently just use a new collection rathre than a whole new DB, which is good news




}, {
  versionKey: false
});


module.exports = mongoose.model('User', UserSchema);
