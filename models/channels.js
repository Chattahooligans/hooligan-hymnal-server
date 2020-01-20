var mongoose = require("mongoose");
var channelSchema = require("./schemas/channelSchema");

module.exports = mongoose.model("channels", channelSchema);
