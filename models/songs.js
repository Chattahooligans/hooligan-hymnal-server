var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var songSchema = require("./schemas/songSchema");

module.exports = mongoose.model("song", songSchema);
