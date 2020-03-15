const { Expo } = require('expo-server-sdk');
const PushTokens = require('./pushTokens');

const expo = new Expo();

async function sendPush(notificationContent, targetPushTokens, senderToken) {
	console.log(`Sending push to ${targetPushTokens.length} devices`);
	const messages = [];
	const receipts = [];
	const errors = [];

	targetPushTokens.map(async (pushToken) => {
		if (!Expo.isExpoPushToken(pushToken.pushToken)) {
			console.error(`Push token ${pushToken.pushToken} is not valid according to Expo.isExpoPushToken()`);
			// we should DO something here? delete it?
			// await PushTokens.findOneAndRemove({ pushToken: pushToken.pushToken });
		}
		else {
			// acceptedExpoExperience is part of a proactive filter to only send to tokens we think belong to us
			let acceptedExpoExperience = "";
			// we can try to match the sender
			if (senderToken)
				acceptedExpoExperience = senderToken.expoExperience;
			// or try to match an environment variable
			if (process.env.EXPO_EXPERIENCE && process.env.EXPO_EXPERIENCE != "")
				acceptedExpoExperience = process.env.EXPO_EXPERIENCE;

			if (pushToken.expoExperience === acceptedExpoExperience) {
				let thisNotification = {};
				Object.assign(thisNotification, notificationContent);
				thisNotification.to = pushToken.pushToken;
				messages.push(thisNotification);
			}
			// else {
			//   const token = await PushTokens.findOneAndRemove({ pushToken: pushToken.pushToken });
			//   console.log(`token ${token.pushToken} was deleted`);
			// }
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
				if (matches != null && matches.length > 0) {
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

	console.log(`Recorded ${receipts.length} receipts from push`);
	console.log(`Error count ${errors.length}, here they are:`);
	console.log(errors)

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

async function sendPost(feedItem, channel, senderToken) {
	// form the notification content
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

	const notificationContent = {
		title: `New notification from ${channel.name}`,
		body: truncatedBody,
		data: { postId: feedItem._id },
	};

	// figure out which devices should get this push
	// (it's all of them, but later it'll be based on channel)
	const targetPushTokens = await PushTokens.find();

	const { receipts, errors } = await sendPush(notificationContent, targetPushTokens, senderToken);
	return { receipts, errors };
}

module.exports = { sendNotification, sendPost, sendPush };
