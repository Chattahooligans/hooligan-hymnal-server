const mongoose = require('mongoose');

const PushTokens = mongoose.model('pushTokens');
const Channels = mongoose.model('channels');
const { Expo } = require('expo-server-sdk');


exports.pushNotification = async (feedItem, sender) => {
  const pushTokens = await PushTokens.find();
  const expo = new Expo();
  const messages = [];
  const receipts = [];
  const channel = await Channels.findById(feedItem.channel);
  pushTokens.map(async (pushToken) => {
    if (!Expo.isExpoPushToken(pushTokens.pushToken)) {
      console.error(`Push token ${pushToken.pushToken} is not valid`);
    }
    if (pushToken.expoExperience === sender.expoExperience) {
      messages.push({
        to: pushToken.pushToken,
        sound: 'default',
        title: `New notification from ${channel.name}`,
        body: `${feedItem.text}... (tab to view more)`,
        data: { post: feedItem.id },
      });
    }
  });
  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];
  (async () => {
    chunks.map(async (chunk) => {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (err) {
        console.error(`${err}`);
      }
    });
  })();
  const receiptsIds = [];
  tickets.map((ticket) => {
    if (ticket.id) {
      receiptsIds.push(ticket.id);
    }
  });
  const receiptsIdsChunks = expo.chunkPushNotificationReceiptIds(receiptsIds);
  (async () => {
    receiptsIdsChunks.map(async (chunk) => {
      try {
        const localReceipts = await expo.getPushNotificationReceiptsAsync(chunk);
        // console.log(receipts);

        localReceipts.map(async (receiptId) => {
          const { status, message, details } = localReceipts[receiptId];
          if (status === 'error') {
            console.error(`There was an error sending a notification: ${message}`);
            if (details && details.error) {
              console.error(`The error code is ${details.error}`);
            }
          }
          if (status === 'ok') {
            receipts.push(message);
          }
        });
      } catch (error) {
        console.error(error);
      }
    });
  })();
  return { messages, receipts };
};
