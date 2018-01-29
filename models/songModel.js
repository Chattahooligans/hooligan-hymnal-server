var mongoose = require('mongoose');

var songSchema = new mongoose.Schema({
  guid: String,
  category: String,
  create_time: String,
  update_time: String,
  title: String,
  tags: String,
  lyrics: String,
  tbd_various_boolean_flags: String,
  reference_title: String,
  reference_link: String,
  instructions: String,
  is_npsl_player: Boolean,
  is_wpsl_player: Boolean,
  is_nisa_player: Boolean,
  player_name: String,
  player_number: String,
  override_html: String,
  delete_local: String
});

module.exports = mongoose.model('song', songSchema);
