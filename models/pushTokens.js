var mongoose = require('mongoose');
var pushTokenSchema = require('./schemas/pushTokenSchema');

module.exports = mongoose.model('pushTokens', pushTokenSchema);
