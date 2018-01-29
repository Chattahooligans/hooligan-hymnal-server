var mongoose = require('mongoose');

var hymnSchema = new mongoose.Schema({
  title: String,
  id: String,
  lyrics: String
});

module.exports = mongoose.model('song', hymnSchema);
