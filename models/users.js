var mongoose = require('mongoose');
var userSchema = require('./schemas/userSchema');

module.exports = mongoose.model('users', userSchema);
