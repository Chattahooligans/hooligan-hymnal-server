var mongoose = require("mongoose");
var songbookSchema = require("./schemas/songbookSchema");

module.exports = mongoose.model("songbook", songbookSchema);
