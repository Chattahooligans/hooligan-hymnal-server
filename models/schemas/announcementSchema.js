var mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  hero_image: String,
  headline: String,
  body: String,
  link: String
});
