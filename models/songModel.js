var mongoose = require('mongoose');

var songSchema = new mongoose.Schema({
  title: String,
  id: String,
  lyrics: String
});

module.exports = mongoose.model('song', songSchema);
