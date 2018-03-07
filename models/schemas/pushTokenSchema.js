var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  pushToken: String,
  lastUsed: String
});
