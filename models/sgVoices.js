var mongoose = require("mongoose");
var sgVoiceSchema = require("./schemas/sgVoiceSchema");

module.exports = mongoose.model("sgVoice", sgVoiceSchema);
