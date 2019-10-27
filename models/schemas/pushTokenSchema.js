var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  pushToken: String,
  expoExperience: String,
  lastUsed: String,
  platform: String,
  platformVersion: String,
  checkinCount: Number
}, {
  timestamps: {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  }
});
