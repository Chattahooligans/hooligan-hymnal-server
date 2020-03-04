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

/**
 * const pushTokens = await PushTokens.find();
    const expo = new Expo();
    const messages = [];
    pushTokens.map(async (pushToken, index) => {
      if (!Expo.isExpoPushToken(pushToken.pushToken)) {
        console.error(`Push token ${pushToken.pushToken} is not valid`);
      }
      if (pushToken.expoExperience === senderToken.expoExperience) {
        console.log(pushToken);
        messages.push({
          to: pushToken.pushToken,
          sound: 'default',
          title: `New notification from ${channel.name}`,
          body: `${feedItem.text}... (tap to view more)`,
          data: { post: feedItem.id },
        });
      }
    });
    // The Expo push notification service accepts batches of notifications so
    // that you don't need to send 1000 requests to send 1000 notifications. We
    // recommend you batch your notifications to reduce the number of requests
    // and to compress them (notifications with similar content will get
    // compressed).
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];
    (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (const chunk of chunks) {
        try {
          const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          console.log(ticketChunk);
          tickets.push(...ticketChunk);
          // NOTE: If a ticket contains an error code in ticket.details.error, you
          // must handle it appropriately. The error codes are listed in the Expo
          // documentation:
          // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
        } catch (error) {
          console.error(error);
        }
      }
    })();
    const receiptIds = [];
    for (const ticket of tickets) {
      // NOTE: Not all tickets have IDs; for example, tickets for notifications
      // that could not be enqueued will have error information and no receipt ID.
      if (ticket.id) {
        receiptIds.push(ticket.id);
      }
    }

    const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    (async () => {
      // Like sending notifications, there are different strategies you could use
      // to retrieve batches of receipts from the Expo service.
      for (const chunk of receiptIdChunks) {
        try {
          const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
          console.log(receipts);

          // The receipts specify whether Apple or Google successfully received the
          // notification and information about an error, if one occurred.
          for (const receiptId in receipts) {
            const { status, message, details } = receipts[receiptId];
            if (status === 'ok') {
              continue;
            } else if (status === 'error') {
              console.error(
                `There was an error sending a notification: ${message}`,
              );
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
    })();
 */
