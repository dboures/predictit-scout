const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  twitterHandle: {
    type: String,
    required: true,
    unique: true
  },
  twitterId_str: {
    type: String,
    required:true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  alerts: {
    type: Array,
    default: []
  },
  roles: [{
    type: String,
  }]
}, {
  versionKey: false
});


module.exports = mongoose.model('User', UserSchema);
