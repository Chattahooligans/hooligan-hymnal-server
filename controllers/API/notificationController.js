const {Expo} = require("expo-server-sdk");
const mongoose = require("mongoose");
const PushTokens = mongoose.model("pushTokens");
const Notifications = mongoose.model("notification");
const { sendNotification } = require("../../handlers/pushNotifications");
let expo = new Expo();

exports.last = async (req, res) => {
	var notification = {
		title: "Please update!",
		lyrics: "Stop! If you're seeing this, you're running an old version of the app! To update, please try closing and re-opening.\n\n" + 
		"If this doesn't work, try checking for an update from the Play/App Store. If all else fails, try uninstalling and reinstalling.\n\n" +
		"Questions? Reach out to @hooliganhymnal on Twitter."
	};
	res.json(notification);
};