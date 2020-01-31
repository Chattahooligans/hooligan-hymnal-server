var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema(
	{
		opponent: String,
		competition: String,
		logo: String,
		backgroundColor: String,
		accentColor: String,
		textColor: String,
		players: [
			{ _id: String, name: String, squadNumber: String, position: String }
		]
	},
	{
		timestamps: {
			createdAt: "create_time",
			updatedAt: "update_time"
		}
	}
);
