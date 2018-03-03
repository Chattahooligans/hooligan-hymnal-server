var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  category: String,
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
  title: String
}, {
  timestamps: {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  }
});
