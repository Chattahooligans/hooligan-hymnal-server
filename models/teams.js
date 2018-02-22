var mongoose = require('mongoose');
var teamSchema = require('./schemas/teamSchema');

module.exports = mongoose.model('team', teamSchema);
