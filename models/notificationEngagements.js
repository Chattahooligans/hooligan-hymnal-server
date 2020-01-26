var mongoose = require("mongoose");
var notificationEngagementsSchema = require("./schemas/notificationEngagementSchema");

module.exports = mongoose.model("notificationEngagements", notificationEngagementsSchema);