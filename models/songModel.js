var mongoose = require('mongoose');

var songSchema = new mongoose.Schema({
  category: String,
  create_time: String,
  delete_local: String,
  instructions: String,
  is_nisa_player: Boolean,
  is_npsl_player: Boolean,
  is_wpsl_player: Boolean,
  lyrics: String,
  override_html: String,
  player_name: String,
  player_number: String,
  reference_link: String,
  reference_title: String,
  tags: String,
  tbd_various_boolean_flags: String,
  title: String,
  update_time: String
});

module.exports = mongoose.model('song', songSchema);
