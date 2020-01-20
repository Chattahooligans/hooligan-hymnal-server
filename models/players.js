var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var playersSchema = require("./schemas/playersSchema");

module.exports = mongoose.model("players", playersSchema);
