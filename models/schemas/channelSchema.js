const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
const mongoDbErrors = require("mongoose-mongodb-errors");

const channelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: "Name required for channel"
	},
	defaultLocale: String,
	description: String,
	avatarUrl: String,
	headerUrl: String,
	follow: Boolean,
	active: Boolean,
	users: [
		{
			id: ObjectId,
			canCreate: Boolean,
			canEdit: Boolean,
			canDelete: Boolean,
			canPush: Boolean
		}
	]
});

channelSchema.plugin(mongoDbErrors);
