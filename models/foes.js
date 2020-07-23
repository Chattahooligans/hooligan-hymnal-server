const mongoose = require('mongoose');
const foesSchema = require('./schemas/foesSchema');

module.exports = mongoose.model('foes', foesSchema);
