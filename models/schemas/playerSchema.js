var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
  name: String,
  squad_number: Number,
  position: String,
  teams: [{ type: ObjectId, ref: 'Team' }],
  bio: String,
  image_thumbnail: String,
  image: String,
  image_hash: String
}, {
  timestamps: {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  }
});
