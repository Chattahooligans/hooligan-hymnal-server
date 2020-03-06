var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var pushTokenSchema = require("./schemas/pushTokenSchema");

module.exports = mongoose.model("pushTokens", pushTokenSchema);
