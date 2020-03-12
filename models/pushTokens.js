const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const pushTokenSchema = require('./schemas/pushTokenSchema');

module.exports = mongoose.model('pushTokens', pushTokenSchema);
