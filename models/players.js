var mongoose = require('mongoose');
var playerSchema = require('./schemas/playerSchema');

module.exports = mongoose.model('player', playerSchema);
