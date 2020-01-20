let PushTokens = require("./pushTokens");
let Expo = require("expo-server-sdk");
let expo = new Expo();

async function sendNotification(notification) {
  var push = { 
    title: notification.song.title,
    body: notification.song.lyrics,
    data: { song: notification.song }
  };
  return await sendPush(push);
}

async function sendPost(post, channel) {
  var body = post.text;
  ["\n", ".", "!", "?"].forEach((value) => {
    if (body.indexOf(value) != -1)
      body = body.substring(0, body.indexOf(value))
  });

  var push = { 
    title: "New notification from " + channel.name,
    body: body + "... (tap to view more)",
    data: { postId: post._id }
  };
  return await sendPush(push);
}

async function sendPush(push) {
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
        errors.push(
          ...chunk.map(
            token => `Error notifying with token ${token}: ${error}`
          )
        );
      }
    }
    return { errors: errors, receipts: receipts };
  });
}

module.exports = { sendNotification, sendPost };