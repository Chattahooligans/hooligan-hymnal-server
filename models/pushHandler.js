const { Expo } = require('expo-server-sdk');
const PushTokens = require('./pushTokens');

const expo = new Expo();

async function sendPush(push) {
  console.log('sending push...');
  const tokens = await PushTokens.find();
  const messages = [];
  const errors = [];
  let receipts = [];
  tokens.map((pushToken) => {
    console.log(pushToken);
    if (!Expo.isExpoPushToken(pushToken.pushToken)) {
      console.error(`Push token ${pushToken.pushToken} is not a valid expo push token`);
    }
    return messages.push({
      to: pushToken.pushToken,
      sound: 'default',
      title: push.title,
      body: push.body,
      data: push.data,
    });
  });
  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];
  (async () => {
    chunks.map(async (chunk) => {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    });
  })();

  const receiptIds = [];
  for (const ticket of tickets) {
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }

  const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  (async () => {
    for (const chunk of receiptIdChunks) {
      try {
        receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        console.log(receipts);
        for (const receiptId in receipts) {
          const { status, message, details } = receipts[receiptId];
          if (status === 'ok') {
            continue;
          } else if (status === 'error') {
            errors.push(message);
            console.error(
              `There was an error sending a notification: ${message}`,
            );
            if (details && details.error) {
              console.error(`The error code is ${details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  })();
  // const chunks = expo.chunkPushNotifications(tokens);
  // chunks.forEach(async (chunk) => {
  //   const notifications = await chunk.map((token) => {
  //     // console.log(`trying to send notification to token: ${token.pushToken}`);
  //     return {
  //       to: token.pushToken,
  //       sound: 'default',
  //       title: push.title,
  //       body: push.body,
  //       data: push.data,
  //     };
  //   });
  // });

  // PushTokens.find(async (error, tokens) => {
  //   if (error) {
  //     throw error;
  //   }
  //   // const errors = [];
  //   // const receipts = [];
  //   const chunks = expo.chunkPushNotifications(tokens);
  //   for (chunk of chunks) {
  //     const notifications = chunk.map((token) => {
  //       console.log(
  //         'trying to send notification to token: ',
  //         token.pushToken,
  //       );
  //       return {
  //         to: token.pushToken,
  //         sound: 'default',
  //         title: push.title,
  //         body: push.body,
  //         data: push.data,
  //       };
  //     });
  //     try {
  //       console.log('trying to push');
  //       receipts.push(
  //         ...(await expo.sendPushNotificationsAsync(notifications)),
  //       );
  //     } catch (error) {
  //       console.log('there was a problem with the push');
  //       const tokenString = chunk
  //         .map((token) => token.pushToken)
  //         .join(', ');
  //       console.error(
  //         `Error notifying with tokens [${tokenString}]: ${error}`,
  //       );

  //       /*
  // 				This line returns an object like:
  // 				{
  // 					"@chattahooligan/chattahooligan-hymnal":
  // 						["ExponentPushToken[NQjQBqBjcnAfQk8N-3R2al]","ExponentPushToken[HcDpdlINasiVlvc8fOIlEa]","ExponentPushToken[I8QML2Ir_01kPeOXEfjizU]","ExponentPushToken[jqoXnuCi8Acw2sk9Dtq_C2]"],
  // 					"@ngsdetroit/chattahooligan-hymnal":
  // 						["ExponentPushToken[rA-sHTCBP85w2U3D9kix17]","ExponentPushToken[r76-uHJwwHZM8y5OwgXNOW]"]
  // 				}

  // 				suggest:
  // 				- an environment variable of the acceptable expo experience
  // 				- not register tokens that don't match
  // 				- capturing keys in that error.details that don't match, deleting associated tokens
  // 			*/
  //       console.error(
  //         `Details: ${JSON.stringify(error.details)}`,
  //       );
  //       errors.push(
  //         ...chunk.map(
  //           (token) => `Error notifying with token ${token}: ${error}`,
  //         ),
  //       );
  //     }
  //   }
  //   console.log(`Starting tokenMatcher block, receipts.length: ${receipts.length}`);
  //   const tokenMatcher = new RegExp('ExponentPushToken');
  //   receipts.forEach((receipt) => {
  //     console.log(`iterating on ${JSON.stringify(receipt)}`);
  //     if (receipt.status == 'error') {
  //       console.log(`error found on ${receipt.message}`);
  //       // run regex to retrieve token from it
  //       const matches = tokenMatcher.exec(receipt.message);
  //       if (matches.length > 0) {
  //         const i = matches.index;
  //         const token = receipt.message.substring(i, i + 41);
  //         // if token found, find and delete
  //         PushTokens.deleteOne({ pushToken: token }).then(
  //           (deleteResult) => {
  //             console.log('deleted bad push token');
  //           },
  //         );
  //       }
  //     }
  //   });
  //   res.send({ errors, receipts });
  // });
  return {
    errors,
    receipts,
  };
  // return res.send({ errors, receipts });
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

module.exports = { sendNotification, sendPost };
