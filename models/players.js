var mongoose = require("mongoose");
var playersSchema = require("./schemas/playersSchema");

module.exports = mongoose.model("players", playersSchema);
