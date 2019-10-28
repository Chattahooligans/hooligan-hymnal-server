var mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  email: String,
  sessionKey: String,
  expiresOn: Date
});
