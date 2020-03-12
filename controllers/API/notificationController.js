const {Expo} = require("expo-server-sdk");
const mongoose = require("mongoose");
const PushTokens = mongoose.model("pushTokens");
const Notifications = mongoose.model("notification");
const { sendNotification } = require("../../handlers/pushNotifications");
let expo = new Expo();

exports.last = async (req, res) => {
	var notification = {
		title: "Please Update!",
		lyrics:"If you can see this, your phone is running an order version of Chattahooligan Hymnal that is no longer supported.\n\n" +
		"- If you force close and reopen the app, you _should_ get the newest update automatically, just look for a version greater than 1.6.0 in the top right corner of the home screen to verify.\n\n" +
		"- If that didn't work, look for an outstanding update from Google Play or the App Store\n\n" +
		"- If _that_ didn't work, uninstall the app and reinstall\n\n" + 
		"Questions? Reach out to @hooliganhymnal on Twitter"
	};
	res.json(notification);
};