var mongoose = require('mongoose');
var songSchema = require('./schemas/songSchema');

module.exports = mongoose.model('song', songSchema);
