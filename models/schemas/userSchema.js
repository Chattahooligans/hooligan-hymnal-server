var mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  email: {
    type: String,
    index: {
      unique: true
    }
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
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
  lastLogin: {
    type: Date,
    default: Date.now
  }
});
