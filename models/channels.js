const mongoose = require('mongoose');
const channelSchema = require('./schemas/channelSchema');

module.exports = mongoose.model('channels', channelSchema);
