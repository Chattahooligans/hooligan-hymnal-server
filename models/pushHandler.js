let PushTokens = require("./pushTokens");
let { Expo } = require("expo-server-sdk");
let expo = new Expo();

async function sendNotification(notification, res) {
	var push = {
		title: notification.song.title,
		body: notification.song.lyrics,
		data: { song: notification.song }
	};
	return await sendPush(push, res);
}

async function sendPost(post, channel, res) {
	var body = post.text;
	["\n", ".", "!", "?"].forEach((value) => {
		if (body.indexOf(value) > 0)
			body = body.substring(0, body.indexOf(value));
	});

	var push = {
		title: "New notification from " + channel.name,
		body: body + "... (tap to view more)",
		data: { postId: post._id }
	};
	await sendPush(push, res);
}

async function sendPush(push, res) {
	console.log("sending push...");
	PushTokens.find(async (error, tokens) => {
		if (error) {
			throw error;
		}
		let errors = [];
		let receipts = [];
		let chunks = expo.chunkPushNotifications(tokens);
		for (chunk of chunks) {
			let notifications = chunk.map(token => {
				console.log(
					"trying to send notification to token: ",
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
				let tokenString = chunk
					.map(token => token.pushToken)
					.join(", ");
				console.error(
					`Error notifying with tokens [${tokenString}]: ${error}`
				);

				/*
					This line returns an object like:
					{
						"@chattahooligan/chattahooligan-hymnal":
							["ExponentPushToken[NQjQBqBjcnAfQk8N-3R2al]","ExponentPushToken[HcDpdlINasiVlvc8fOIlEa]","ExponentPushToken[I8QML2Ir_01kPeOXEfjizU]","ExponentPushToken[jqoXnuCi8Acw2sk9Dtq_C2]"],
						"@ngsdetroit/chattahooligan-hymnal":
							["ExponentPushToken[rA-sHTCBP85w2U3D9kix17]","ExponentPushToken[r76-uHJwwHZM8y5OwgXNOW]"]
					}

					suggest:
					- an environment variable of the acceptable expo experience
					- not register tokens that don't match
					- capturing keys in that error.details that don't match, deleting associated tokens
				*/
				console.error(
					`Details: ${JSON.stringify(error.details)}`
				);
				errors.push(
					...chunk.map(
						token => `Error notifying with token ${token}: ${error}`
					)
				);
			}
		}
		console.log("Starting tokenMatcher block")
		var tokenMatcher = new RegExp("ExponentPushToken");
		receipts.forEach(receipt => {
			if (receipt.status == "error") {
				console.log("error found on " + receipt.message)
				//run regex to retrieve token from it
				let matches = tokenMatcher.exec(receipt.message);
				if (matches.length > 0) {
					let i = matches.index;
					var token = receipt.message.substring(i, i + 41);
					//if token found, find and delete
					PushTokens.deleteOne({ pushToken: token }).then(
						deleteResult => {
							console.log("deleted bad push token");
						}
					);
				}
			}
		});
		res.send({ errors: errors, receipts: receipts });
	});
}

module.exports = { sendNotification, sendPost };
