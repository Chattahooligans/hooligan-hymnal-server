var mongoose = require('mongoose');
var notificationSchema = require('./schemas/notificationSchema');

module.exports = mongoose.model('notification', notificationSchema);
