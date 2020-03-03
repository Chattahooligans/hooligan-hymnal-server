const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const songSchema = require('./schemas/songSchema');

module.exports = mongoose.model('song', songSchema);
