var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var notificationSchema = require("./schemas/notificationSchema");

module.exports = mongoose.model("notification", notificationSchema);
