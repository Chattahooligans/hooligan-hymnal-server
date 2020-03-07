const { Expo } = require('expo-server-sdk');
const PushTokens = require('./pushTokens');

const expo = new Expo();

async function sendPush(feedItem, senderToken, channel) {
	console.log('sending push...');
	const pushTokens = await PushTokens.find();
	const messages = [];
	const receipts = [];
	const errors = [];

	let truncatedBody = feedItem.text;
	// we want the punctuation, so add 1
	[".", "!", "?"].forEach((value) => {
		if (truncatedBody.indexOf(value) > 0)
			truncatedBody = truncatedBody.substring(0, truncatedBody.indexOf(value) + 1);
	});
	// we don't want the newline, so no +1
	["\n"].forEach((value) => {
		if (truncatedBody.indexOf(value) > 0)
			truncatedBody = truncatedBody.substring(0, truncatedBody.indexOf(value));
	});

	// if, after all that, we didn't change anything
	if (truncatedBody === feedItem.text)
		truncatedBody += " (tap to view more)"
	else
		truncatedBody += "... (tap to view more)"

	let baseNotificationContent = {
		title: `New notification from ${channel.name}`,
		body: truncatedBody,
		data: { post: feedItem._id },
	};

	console.log("baseNotificationContent")
	console.log(baseNotificationContent)

	pushTokens.map(async (pushToken) => {
		if (!Expo.isExpoPushToken(pushToken.pushToken)) {
			console.error(`Push token ${pushToken.pushToken} is not valid`);
		}

		let acceptedExpoExperience = senderToken.expoExperience
		if (process.env.EXPO_EXPERIENCE && process.env.EXPO_EXPERIENCE != "")
			acceptedExpoExperience = process.env.EXPO_EXPERIENCE;

		if (pushToken.expoExperience === acceptedExpoExperience) {
			let notificationContent = {};
			Object.assign(notificationContent, baseNotificationContent);
			notificationContent.to = pushToken;
			messages.push(notificationContent);
		}
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
		console.log("(before push attempt) chunkPushNotifications chunk count: " + chunk.length)
		try {
			const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
			receipts.push(...ticketChunk);
			// NOTE: If a ticket contains an error code in ticket.details.error, you
			// must handle it appropriately. The error codes are listed in the Expo
			// documentation:
			// https://docs.expo.io/versions/latest/guides/push-notifications#response-format
		} catch (error) {
			console.log('There was a problem with the push for this chunk');
			console.error(error);
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
							error.details[key].forEach((token) => {
								PushTokens.deleteOne({ pushToken: token }).then(
									(deleteResult) => {
										console.log(`Deleted token with mismatched experience ${token}`);
									},
								);
							});
						}
						else {
							// These are good tokens. Keep track of them.
							error.details[key].forEach((token) => {
								validTokens.push(token);
							})
						}
					});

					try {
						console.log('Conflict with experience, trying to send again for: ' + validTokens)
						let validChunk = [];
						chunk.forEach((element) => {
							if (validTokens.includes(element.to))
								validChunk.push(element)
						})

						const ticketChunk = await expo.sendPushNotificationsAsync(validChunk);
						receipts.push(...ticketChunk);
					}
					catch (error) {
						// surrender at this point
						console.error(`A second error occured: ` + error)
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

	for (const receipt of receipts) {
		try {
			if (receipt.status === 'error') {
				// Write to errors object. We return this later
				errors.push(receipt);
				console.error(`There was an error sending a notification: ` + JSON.stringify(receipt));

				const tokenMatcher = new RegExp('ExponentPushToken');
				const matches = tokenMatcher.exec(receipt.message);
				if (matches.length > 0) {
					const i = matches.index;
					const token = receipt.message.substring(i, i + 41);
					console.error(`Deleting bad token: ${token}`);
					await PushTokens.findOneAndRemove({ pushToken: token });
				}
			}
		}
		catch (error) {
			console.error("Receipt cleanup error:  " + error)
		}
	}

	return {
		receipts,
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
