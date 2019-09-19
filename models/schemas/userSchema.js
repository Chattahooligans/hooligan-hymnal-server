var mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  email: String,
  hash: String,
  pushNotificationsAllowed: Boolean,
  rosterAllowed: Boolean,
  songbookAllowed: Boolean,
  foesAllowed: Boolean
});
