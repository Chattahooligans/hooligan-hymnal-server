var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema(
	{
		feedItem: ObjectId,
		pushToken: String,
		engagedAt: Date
	},
	{
		timestamps: { createdAt: true, updatedAt: false }
	}
);