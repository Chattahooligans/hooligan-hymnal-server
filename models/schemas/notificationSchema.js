var mongoose = require("mongoose");
var songSchema = require("./songSchema");
var announcementSchema = require("./announcementSchema");

module.exports = new mongoose.Schema({
  sender: String,
  send_time: String,
  expire_time: String,
  sender_latitude: String,
  sender_longitude: String,
  message: String,
  push: Boolean,
  song: songSchema,
  announcement: announcementSchema
});
