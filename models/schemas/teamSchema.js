var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: String,
  siteUrl: String,
  logo: String
});
