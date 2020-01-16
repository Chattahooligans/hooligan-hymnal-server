var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var feedItemSchema = require("./schemas/feedItemSchema");

module.exports = mongoose.model("feedItem", feedItemSchema);
