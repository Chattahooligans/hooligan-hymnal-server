const mongoose = require('mongoose');
const feedItemSchema = require('./schemas/feedItemSchema');

module.exports = mongoose.model('feedItem', feedItemSchema);
