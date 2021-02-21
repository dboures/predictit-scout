const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
  id : {
      type: Number,
      required: true,
  },
  name : {
    type: String,
    required: true,
    unique:true
  },
  shortName: {
    type: String,
    required: true,
    unique:true
  },
  url: {
    type: String,
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  },
  contracts: {
    type: Array,
    default:[]
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('State', StateSchema);
