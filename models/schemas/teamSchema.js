var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: String,
  npsl_site_url: String,
  logo: String
});
