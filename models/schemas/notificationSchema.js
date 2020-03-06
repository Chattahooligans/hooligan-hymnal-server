const mongoose = require('mongoose');
const songSchema = require('./songSchema');
const goalkeeperNicknameSchema = require('./goalkeeperNicknameSchema');
const announcementSchema = require('./announcementSchema');

module.exports = new mongoose.Schema({
  sender: String,
  send_time: String,
  expire_time: String,
  sender_latitude: String,
  sender_longitude: String,
  message: String,
  push: Boolean,
  song: songSchema,
  goalkeeperNickname: goalkeeperNicknameSchema,
  announcement: announcementSchema,
});
