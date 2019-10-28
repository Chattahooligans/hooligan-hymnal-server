var mongoose = require('mongoose');
var sessionSchema = require('./schemas/sessionSchema');

module.exports = mongoose.model('sessions', sessionSchema);