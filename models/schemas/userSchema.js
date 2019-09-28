var mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  email: {
    type: String,
    index: {
      unique: true
    }
  },
  hash: String,
  pushNotificationsAllowed: Boolean,
  rosterAllowed: Boolean,
  songbookAllowed: Boolean,
  foesAllowed: Boolean
});
