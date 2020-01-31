const mongoose = require("mongoose");
const NotificationEngagements = mongoose.model("notificationEngagements");
const PushTokens = mongoose.model("pushTokens");
const FeedItems = mongoose.model("feedItem");

exports.create = async (req, res, next) => {
	try {
		let feedItem = await FeedItems.findById(req.params.id);
		if (!feedItem) {
			res.status(404);
			res.send("");
			return;
		}
		let pushToken = await PushTokens.findOne({ pushToken: req.body.pushToken });
		if (!pushToken) {
			res.status(401);
			res.send("");
			return;
		}
		let engagementDetails = {
			feedItem: feedItem._id,
			pushToken: pushToken.pushToken,
			// engagedAt: Date.parse(req.body.timestamp)
		};
		NotificationEngagements.find(engagementDetails)
			.then(engagements => {
				if (engagements.length > 0) {
					res.status(400);
					res.send("");
					return;
				}
				engagementDetails.engagedAt = Date.parse(req.body.engagedAt);
				return NotificationEngagements.create(engagementDetails);
			})
			.then(() => {
				res.status(204);
				res.send("");
				return;
			})
			.catch (error => {
				return next(error);
			});
	} catch (error) {
		return next(error);
	}
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
		NotificationEngagements.find({feedItem: feedItem._id})
			.then(engagements => {
				res.send(engagements);
				return;
			});

	} catch (error) {
		return next(error);
	}
};

exports.summarize = async (req, res, next) => {
	try {
		let feedItem = await FeedItems.findById(req.params.id);
		if (!feedItem) {
			res.status(404);
			res.send("");
			return;
		}
		NotificationEngagements.aggregate([
			{ $match: { feedItem: feedItem._id}},
			{ $group: {
				_id: feedItem._id,
				count: { $sum: 1 } ,
				"firstEngagement": {$min: "$createdAt"},
				"latestEngagement": {$max: "$createdAt"},
			}}
		])
			.then(engagements => {
				res.send(engagements);
				return;
			})
			.catch(error => {
				return next(error);
			});
	} catch (error) {
		return next(error);
	}
};
