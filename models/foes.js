var mongoose = require("mongoose");
var foesSchema = require("./schemas/foesSchema");

module.exports = mongoose.model("foes", foesSchema);
