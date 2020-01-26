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

exports.show = async (req, res, next) => {
	try {
		let feedItem = await FeedItems.findById(req.params.id);
		console.log(feedItem);
		if (!feedItem) {
			res.status(404);
			res.send("");
			return;
		}
		let engagements = NotificationEngagements.find({feedItem: feedItem._id});
		res.send(engagements);
	} catch (error) {
		return next(error);
	}
};

exports.summarize = async (req, res) => {
	let feedItem = await FeedItems.findById(req.params.id);
	console.log(feedItem);
	if (!feedItem) {
		res.status(404);
		return;
	}
	let engagements = NotificationEngagements.aggregate()
		.match({ feedItem: feedItem._id })
		.count("_id")
		.exec();
	res.send(engagements);
};
