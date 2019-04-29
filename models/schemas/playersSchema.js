var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
  name: String,
  flag: String,
  squadNumber: String,
  position: String,
  team: String,
  bio: String,
  thumbnail: String,
  image: String,
  twitter: String,
  instagram: String
}, {
  timestamps: {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  }
});
