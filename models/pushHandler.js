const { Expo } = require('expo-server-sdk');
const PushTokens = require('./pushTokens');

const expo = new Expo();

async function sendPush(feedItem, senderToken, channel) {
	console.log('sending push...');
	const pushTokens = await PushTokens.find();
	const messages = [];
	const tickets = [];
	const errors = [];
	pushTokens.map(async (pushToken) => {
		if (!Expo.isExpoPushToken(pushToken.pushToken)) {
			console.error(`Push token ${pushToken.pushToken} is not valid`);
		}
		if (pushToken.expoExperience === senderToken.expoExperience) {
			messages.push({
				to: pushToken.pushToken,
				sound: 'default',
				title: `New notification from ${channel.name}`,
				body: `${feedItem.text}... (tap to view more)`,
				data: { post: feedItem.id },
			});
		}
		// else {
		//   const token = await PushTokens.findOneAndRemove({ pushToken: pushToken.pushToken });
		//   console.log(`token ${token.pushToken} was deleted`);
		// }
	});
	// The Expo push notification service accepts batches of notifications so
	// that you don't need to send 1000 requests to send 1000 notifications. We
	// recommend you batch your notifications to reduce the number of requests
	// and to compress them (notifications with similar content will get
	// compressed).
	const chunks = expo.chunkPushNotifications(messages);
	// Send the chunks to the Expo push notification service. There are
	// different strategies you could use. A simple one is to send one chunk at a
	// time, which nicely spreads the load out over time:
	for (const chunk of chunks) {
		try {
			const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
			tickets.push(...ticketChunk);
			// NOTE: If a ticket contains an error code in ticket.details.error, you
			// must handle it appropriately. The error codes are listed in the Expo
			// documentation:
			// https://docs.expo.io/versions/latest/guides/push-notifications#response-format
		} catch (error) {
			// console.error(error);
			console.log('there was a problem with the push for this chunk');
			const tokenString = chunk
				.map((token) => token.to)
				.join(', ');
			console.error(
				`Error notifying with tokens [${tokenString}]: ${error}`,
			);
			console.error(
				`Details: ${JSON.stringify(error.details)}`,
			);

			// only go down this path if it's the mixed expo experience issue
			const experienceConflictCode = 'PUSH_TOO_MANY_EXPERIENCE_IDS';
			if (error.code === experienceConflictCode) {
				// and check the environment variable exists first
				if (process.env.EXPO_EXPERIENCE) {
					const acceptedExpoExperience = process.env.EXPO_EXPERIENCE;
					let validTokens = []
					Object.keys(error.details).forEach((key) => {
						if (acceptedExpoExperience !== key) {
							console.log(`expoExperience mismatch: ${acceptedExpoExperience} vs ${key}`);
							/*
							error.details[key].forEach((token) => {
								PushTokens.deleteOne({ pushToken: token }).then(
									(deleteResult) => {
										console.log(`Deleted token with mismatched experience ${token}`);
									},
								);
							});
							*/
						}
						else {
							// These are good tokens. Keep track of them.
							console.log("Save the valid tokens for " + key)
							error.details[key].forEach((token) => {
								validTokens.push(token);
							})
						}
					});

					// okay, the tokens from conflicting experiences have been cleaned up
					// let's try pushing the valid ones again
					try {
						console.log("Valid Tokens still, count: " + validTokens.length)
						let validChunk = [];
						chunk.forEach((element) => {
							if (validTokens.includes(element.to))
								validChunk.push(element)
						})

						console.log("valid chunk?")
						console.log(validChunk)
						const ticketChunk = await expo.sendPushNotificationsAsync(validChunk);
						tickets.push(...ticketChunk);
					}
					catch (error) {
						// surrender at this point
						console.error("A second error occured: " + error)
					}
				}
			}

			errors.push(
				...chunk.map(
					(token) => `Error notifying with token ${token}: ${error}`,
				),
			);
		}
	}
	const receiptIds = [];
	for (const ticket of tickets) {
		// NOTE: Not all tickets have IDs; for example, tickets for notifications
		// that could not be enqueued will have error information and no receipt ID.
		if (ticket.id) {
			receiptIds.push(ticket.id);
		}
	}

	const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
	// Like sending notifications, there are different strategies you could use
	// to retrieve batches of receipts from the Expo service.
	for (const chunk of receiptIdChunks) {
		try {
			const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
			// The receipts specify whether Apple or Google successfully received the
			// notification and information about an error, if one occurred.
			for (const receiptId in receipts) {
				const { status, message, details } = receipts[receiptId];
				if (status === 'ok') {
					continue;
				} else if (status === 'error') {
					errors.push({ status, details });
					console.error(
						`There was an error sending a notification: ${message}`,
					);
					const tokenMatcher = new RegExp('ExponentPushToken');
					const matches = tokenMatcher.exec(message);
					if (matches.length > 0) {
						const i = matches.index;
						const token = message.substring(i, i + 41);
						console.error(`Bad token: ${token}`);
						const deletedPushToken = await PushTokens.findOneAndRemove({ pushToken: token });
						console.error(`Removed ${deletedPushToken.token} from db`);
					}
					if (details && details.error) {
						// The error codes are listed in the Expo documentation:
						// https://docs.expo.io/versions/latest/guides/push-notifications/#individual-errors
						// You must handle the errors appropriately.
						console.error(`The error code is ${details.error}`);
					}
				}
			}
		} catch (error) {
			console.error(error);
		}
	}
	return {
		tickets,
		errors,
	};
}

async function sendNotification(notification) {
	const push = {
		title: notification.song.title,
		body: notification.song.lyrics,
		data: { song: notification.song },
	};
	const { errors, receipts } = await sendPush(push);
	return { errors, receipts };
}

async function sendPost(post, channel) {
	let body = post.text;
	['\n', '.', '!', '?'].forEach((value) => {
		if (body.indexOf(value) > 0) { body = body.substring(0, body.indexOf(value)); }
	});

	const push = {
		title: `New notification from ${channel.name}`,
		body: `${body}... (tap to view more)`,
		data: { postId: post._id },
	};
	await sendPush(push);
}

module.exports = { sendNotification, sendPost, sendPush };
