const mongoose = require("mongoose");
const NotificationEngagements = mongoose.model("notificationEngagements");
const PushTokens = mongoose.model("pushTokens");
const FeedItems = mongoose.model("feedItem");

exports.create = async (req, res) => {
	let feedItem = await FeedItems.findById(req.params.id);
	if (!feedItem) {
		res.status(404);
		return;
	}
	let pushToken = await PushTokens.findOne({ pushToken: req.body.pushToken });
	if (!pushToken) {
		res.status(401);
		return;
	}
	let engagementDetails = { 
		feedItem: feedItem._id, 
		pushToken: pushToken.pushToken,
		engagedAt: Date.parse(req.body.timestamp)
	};
	let engagement = NotificationEngagements.create(engagementDetails);
	engagement.save();
	res.status(204);
};

exports.show = async (req, res) => {
	let engagements = NotificationEngagements.find({feedItem: req.params.id});
	res.send(engagements);
};

exports.summarize = async (req, res) => {
	let engagements = NotificationEngagements.aggregate()
		.match({ feedItem: req.params.id })
		.count("_id")
		.exec();
	res.send(engagements);
};
