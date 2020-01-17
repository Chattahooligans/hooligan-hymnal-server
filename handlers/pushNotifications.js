// Add push stuff here
const PushTokens = require("../models/pushTokens");
const Expo = require("expo-server-sdk");
const expo = new Expo();

async function sendNotification(notification) {
	const push = {
		title: notification.song.title,
		body: notification.song.lyrics,
		data: {
			song: notification.song
		}
	};
	return await sendPush(push);
}

async function sendPost(post) {
	const push = {
		title: post.title,
		body: post.text,
		data: post.data
	};
	return await sendPush(push);
}

async function sendPush(push) {
	const pushTokens = await PushTokens.find();
	let errors = [];
	let receipts = [];
	let chunks = expo.chunkPushNotifications(pushTokens);
	for (let chunk of chunks) {
		let notifications = chunk.map(token => {
			console.log(
				"trying to send notification to token:",
				token.pushToken
			);
			return {
				to: token.pushToken,
				sound: "default",
				title: push.title,
				body: push.body,
				data: push.data
			};
		});
		try {
			console.log("trying to push");
			receipts.push(
				...(await expo.sendPushNotificationsAsync(notifications))
			);
		} catch (error) {
			console.log("there was a problem with the push");
			let tokenString = chunk.map(token => token.pushToken)
				.join(", ");
			console.error(`Error notifying with tokens [${tokenString}]: ${error}`);
			errors.push(
				...chunk.map(
					token => `Error notifying with tokens ${token}: ${error}`
				)
			);
		}
	}
	return {
		errors: errors,
		receipts: receipts
	};
}


module.exports = { sendNotification, sendPost };
