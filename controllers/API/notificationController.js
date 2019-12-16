const Expo = require("expo-server-sdk");
const mongoose = require("mongoose");
const PushTokens = mongoose.model("pushTokens");
const Notifications = mongoose.model("notification");
let expo = new Expo();

exports.last = async (req, res) => {
  const notification = await Notifications.where({
    send_time: -1
  }).limit(1);
  res.send(notification[0]);
};

exports.store = async (req, res) => {
  console.log("entering post for notification push");
  const notification = await new Notifications(req.body).save();
  if (!notification.push) {
    return res.json({
      message: `Notification created but not pushed: ${notification._id}`
    });
  }
  console.log("Pushing notification");
  const tokens = await PushTokens.find({});
  for (let token of tokens) {
    if (expo.isExpoPushToken(token.pushToken)) {
      console.error(`Not valid push token: ${token}`);
      await PushTokens.findByIdAndRemove(token._id);
    }
  }

  let errors = [];
  let receipts = [];
  let chunks = expo.chunkPushNotifications(tokens);
  for (let chunk of chunks) {
    let notifications = chunk.map(token => {
      console.log(`Trying to send notification to token: ${token.pushToken}`);
      return {
        to: token.pushToken,
        sound: "default",
        title: notification.song.title,
        body: notification.song.lyrics,
        data: {
          song: notification.song
        }
      };
    });
    try {
      console.log("trying to push");
      receipts.push(...(await expo.sendPushNotificationsAsync(notifications)));
    } catch (error) {
      console.log("there was a problem with the push");
      let tokenString = chunk.map(token => token.pushToken).join(", ");
      console.error(`Error notifying with tokens [${tokenString}]: ${error}`);
      errors.push(
        ...chunk.map(token => `Error notifying with token ${token}: ${error}`)
      );
    }
  }
  const tokenMatcher = new RegExp("ExponentPushToken");
  receipts.forEach(async receipt => {
    if (receipt.status == "error") {
      let matches = tokenMatcher.exec(receipt.message);
      if (matches.length > 0) {
        let i = matches.index;
        const token = receipt.message.substring(i, i + 41);
        const pushToken = await PushTokens.findOneAndDelete({
          pushToken: token
        });
        console.log(`Push Token Deleted ${pushToken}`);
      }
    }
  });
  res.json({
    errors,
    receipts,
    notification
  });
};
