var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var rosterSchema = require("./schemas/rosterSchema");

module.exports = mongoose.model("roster", rosterSchema);
