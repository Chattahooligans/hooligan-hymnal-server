var mongoose = require('mongoose');
var rosterSchema = require('./schemas/rosterSchema');

module.exports = mongoose.model('roster', rosterSchema);
