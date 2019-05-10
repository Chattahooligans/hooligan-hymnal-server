var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
  nickname: String,
  backgroundColor: String,
  textColor: String
});
