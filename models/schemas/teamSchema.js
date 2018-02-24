var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: String,
  site_url: String,
  logo: String
});
