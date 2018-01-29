var mongoose = require('mongoose');

var notificationSchema = new mongoose.Schema({
  title: String,
  lyrics: String
});

module.exports = mongoose.model('notification', notificationSchema);
