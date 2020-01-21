// Add push stuff here
const PushTokens = require("../models/pushTokens");
const { Expo } = require("expo-server-sdk");
const expo = new Expo();

// let messages = [];
// let pushTokens = PushTokens.find({});
// for (let token of pushTokens) {
// 	if (!Expo.isExpoPushToken(token.pushToken)) {
// 		console.error(`Push token ${token.pushToken} is not valid Expo push token`);
// 		continue;
// 	}

// 	messages.push({
// 		to: token.pushToken,
//     sound: "default",
//     body: {
//       title:
//     }
// 	});

// 	// pushToken.
// }

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
	let messages = [];
	const pushTokens = await PushTokens.find();
	for (let token of pushTokens) {
		const { pushToken } = token;
		if (!Expo.isExpoPushToken(pushToken)) {
			console.error(`Push token ${pushToken}`);
			continue;
		}
		messages.push({
			to: pushToken,
			sound: "default",
			title: push.title,
			body: push.body,
			data: push.data
		});
	}

	let chunks = expo.chunkPushNotifications(messages);
	let tickets = [];
	(async () => {
		for (let chunk of chunks) {
			try {
				let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
				console.log(ticketChunk);
				tickets.push(...ticketChunk);
			} catch (error) {
				console.error(error);
			}
		}
	})();

	let receiptsIds = [];
	for(let ticket of tickets) {
		if (ticket.id) {
			receiptsIds.push(ticket.id);
		}
	}
	let receiptsIdChunks = expo.chunkPushNotificationReceiptIds(receiptsIds);
	(async () => {
		for (let chunk of receiptsIdChunks) {
			try {
				let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
				console.log(receipts);
				for (let receipt of receipts) {
					if (receipt.status === "ok") {
						continue;
					} else if (receipt.status === "error") {
						console.error(`There was an error sending a notification: ${receipt.message}`);
						if (receipt.details && receipt.details.error) {
							console.error(`The error code is ${receipt.details.error}`);
						}
					}
				}
			} catch (error) {
				console.error(error);
			}
		}
	})();
	// const pushTokens = await PushTokens.find();
	// let errors = [];
	// let receipts = [];
	// let chunks = expo.chunkPushNotifications(pushTokens);
	// for (let chunk of chunks) {
	// 	let notifications = chunk.map(token => {
	// 		console.log(
	// 			"trying to send notification to token:",
	// 			token.pushToken
	// 		);
	// 		return {
	// 			to: token.pushToken,
	// 			sound: "default",
	// 			title: push.title,
	// 			body: push.body,
	// 			data: push.data
	// 		};
	// 	});
	// 	try {
	// 		console.log("trying to push");
	// 		receipts.push(
	// 			...(await expo.sendPushNotificationsAsync(notifications))
	// 		);
	// 	} catch (error) {
	// 		console.log("there was a problem with the push");
	// 		let tokenString = chunk.map(token => token.pushToken)
	// 			.join(", ");
	// 		console.error(`Error notifying with tokens [${tokenString}]: ${error}`);
	// 		errors.push(
	// 			...chunk.map(
	// 				token => `Error notifying with tokens ${token}: ${error}`
	// 			)
	// 		);
	// 	}
	// }
	// return {
	// 	errors: errors,
	// 	receipts: receipts
	// };
}


module.exports = { sendNotification, sendPost };
