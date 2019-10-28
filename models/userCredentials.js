var mongoose = require('mongoose');
var userCredentialsSchema = require('./schemas/userCredentialsSchema');

module.exports = mongoose.model('userCredentials', userCredentialsSchema);
