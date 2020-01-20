const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

module.exports = new mongoose.Schema({
  email: {
    type: String,
    index: {
      unique: true
    }
  },
  hash: String,
  pushNotificationsAllowed: {
    type: Boolean,
    default: true
  },
  rosterAllowed: {
    type: Boolean,
    default: false
  },
  songbookAllowed: {
    type: Boolean,
    default: false
  },
  foesAllowed: {
    type: Boolean,
    default: false
  },
  feedAllowed: {
    type: Boolean,
    default: false
  }
});
