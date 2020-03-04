const mongoose = require('mongoose');

const FeedItems = mongoose.model('feedItem');
const Channels = mongoose.model('channels');
const { Expo } = require('expo-server-sdk');

const PushTokens = mongoose.model('pushTokens');
// const FeedItems = require('../../models/feeditems');
// const Channels = require('../../models/channels');
const moment = require('moment');
const config = require('../../config.js');
// const PushHandler = require('../../models/pushHandler');
const { upload } = require('../../handlers/imageUploader');

const feeditems_cache = {
  data: null,
  last_refresh: 0,
  force_reload(res, sendCallback) {
    const that = this;
    FeedItems.find((error, feed) => {
      if (error) {
        that.data = null;
        that.last_refresh = 0;
        if (res != null) res.send(error);
      }
      // sort cache on publishedAt, descending
      that.data = feed.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
      that.last_refresh = Date.now();
      if (res != null) {
        sendCallback(that.data);
      }
    });
  },
  send_data(res, publishedBefore, limit) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      this.force_reload(res, (data) => res.send(
        this.filter_data(data, publishedBefore, limit),
      ));
    } else {
      res.send(this.filter_data(this.data, publishedBefore, limit));
    }
  },
  send_active(res, publishedBefore, limit) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      this.force_reload(res, (data) => res.send(
        this.filter_data(
          this.get_active_items(data), publishedBefore, limit,
        ),
      ));
    } else {
      res.send(this.filter_data(this.get_active_items(this.data), publishedBefore, limit));
    }
  },
  send_channel(res, channelId, publishedBefore, limit) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      this.force_reload(res, (data) => res.send(
        this.filter_data(
          this.get_channel_items(data, channelId), publishedBefore, limit,
        ),
      ));
    } else {
      res.send(this.filter_data(this.get_channel_items(this.data, channelId), publishedBefore, limit));
    }
  },
  get_active_items(data) {
    const active = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].active) active.push(data[i]);
    }
    return active;
  },
  get_channel_items(data, channelId) {
    const items = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].channel == channelId && data[i].channel) items.push(data[i]);
    }
    return items;
  },
  filter_data(data, publishedBefore, limit) {
    limit = parseInt(limit);
    publishedBefore = Date.parse(publishedBefore); console.log(publishedBefore);
    if (!publishedBefore) publishedBefore = new Date();
    if (!limit) limit = 20;
    const filtered = data.filter((i) => i.publishedAt < publishedBefore);
    return filtered.slice(0, limit);
  },
};

exports.active = async (req, res) => {
  feeditems_cache.send_active(res, req.query.publishedBefore, req.query.limit);
};

exports.all = async (req, res) => {
  feeditems_cache.send_data(res, req.query.publishedBefore, req.query.limit);
};

exports.show = async (req, res) => {
  FeedItems.findById(req.params.id, (error, feedItem) => {
    res.send(feedItem);
  });
};

exports.channel = async (req, res) => {
  feeditems_cache.send_channel(res, req.params.id, req.query.publishedBefore, req.query.limit);
};

exports.store = async (req, res) => {
  console.log('CONSPICUOUS LOGGING TO POST TO FEED');
  console.log('BODY');
  console.log(req.body);
  console.log('FILES');
  console.log(req.files);
  /*
      Notes on images:
      - the server expects .images as file streams and the same number of accompanying .metadata
      - .metadata is a either a single object or an array, becaue of oddities with multipart/form-data
      - using a similar pattern, .remoteImages and .remoteMetadat are objects / arrays of the same length

      - we want to treat everything as an array to iterate over, so we convert the single-item versions to arrays of length=1

      - each of .images, .metadata, .remoteImages, .remoteMetadata all have a matching .index property for the final sequence
      - these are all combined into feedItemImages to store in the db
  */
  const feedItemImages = [];

  req.body.active = true;
  const channel = await Channels.findById(req.body.channel);
  const data = {
    sender: JSON.parse(req.body.sender),
    publishedAt: req.body.publishedAt,
    push: req.body.push === 'true',
    locale: req.body.locale,
    text: req.body.text,
    images: feedItemImages,
    attachments: req.body.attachments ? JSON.parse(req.body.attachments) : [],
    active: true,
    channel: channel.id,
  };

  const userHasPermission = channel.users.some((user) => user.canCreate && String(user._id) === String(req.user._id));
  if (!userHasPermission) {
    return res.status(401).send('You do not have permission to post to this news feed channel');
  }

  req.body.images = [];
  if (req.files && req.files.images) {
    req.files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
    req.body.metadata = Array.isArray(req.body.metadata) ? req.body.metadata : [req.body.metadata];

    const date = moment(req.body.publishedAt).format('YYYY/MM/DD_HHmm');
    const targetFolder = `feed/${date}`;

    // upload() returns an array
    const images = await upload(req, {
      folder: targetFolder,
    });

    // if there's only one item, turn it into an array
    let uploadMetadata = [];
    if (Array.isArray(req.body.metadata)) {
      console.log('req.body.metadata is array, assign it to uploadMetadata');
      uploadMetadata = req.body.metadata;
      console.log(uploadMetadata);
    } else {
      console.log('req.body.metadata is not an array, push it to uploadMetadata');
      uploadMetadata.push(req.body.metadata);
      console.log(uploadMetadata);
    }

    images.forEach((image, index) => {
      console.log('PROCESSING UPLOADED IMAGE');
      console.log(image);
      const thisMetadata = JSON.parse(uploadMetadata[index]);
      console.log(JSON.stringify(thisMetadata));
      const targetIndex = thisMetadata.index;

      const thisImage = {
        uri: image.url,
        metadata: thisMetadata,
      };

      delete thisImage.metadata.index;

      console.log(`PROCESSED AN UPLOADED IMAGE, will place in index ${targetIndex}`);
      console.log(JSON.stringify(thisImage));

      feedItemImages[targetIndex] = thisImage;
    });
  }

  if (req.body.remoteImages) {
    // if there's only one item, turn it into an array
    let remoteImages = [];
    let remoteMetadata = [];
    if (Array.isArray(req.body.remoteImages)) {
      console.log('req.body.remoteImages is array, assign it');
      remoteImages = req.body.remoteImages;
      remoteMetadata = req.body.remoteMetadata;
      console.log(remoteImages);
      console.log(remoteMetadata);
    } else {
      console.log('req.body.remoteImages is not an array, push it');
      remoteImages.push(req.body.remoteImages);
      remoteMetadata.push(req.body.remoteMetadata);
      console.log(remoteImages);
      console.log(remoteMetadata);
    }

    remoteImages.forEach((image, index) => {
      console.log('PROCESSING REMOTE IMAGE');
      const parsedImage = JSON.parse(image);
      console.log(parsedImage);
      const thisMetadata = JSON.parse(remoteMetadata[index]);
      console.log(JSON.stringify(thisMetadata));
      const targetIndex = thisMetadata.index;

      const thisImage = {
        uri: parsedImage.uri,
        thumbnailUri: parsedImage.thumbnailUri,
        metadata: thisMetadata,
      };

      delete thisImage.metadata.index;

      console.log(`PROCESSED A REMOTE IMAGE, will place into index ${targetIndex}`);
      console.log(JSON.stringify(thisImage));

      feedItemImages[targetIndex] = thisImage;
    });
  }

  console.log('DONE PROCESSING IMAGES, feedItemImages is');
  console.log(JSON.stringify(feedItemImages));

  console.log('ABOUT TO SAVE FEEDITEM TO DATABASE');
  const feedItem = await (new FeedItems(data)).save();
  console.log('SAVED FEEDITEM TO DATABASE');
  console.log('CHECKING FOR PUSH');
  if (feedItem.push) {
    console.log('PUSH TRUE');
    const pushTokens = await PushTokens.find();
    const expo = new Expo();
    const messages = [];
    pushTokens.map(async (pushToken, index) => {
      if (!Expo.isExpoPushToken(pushToken.pushToken)) {
        console.error(`Push token ${pushTokens.pushToken} is not valid`);
      }
      console.log(pushToken);
      messages.push({
        to: pushToken.pushToken,
        sound: 'default',
        title: `New notification from ${channel.name}`,
        body: `${feedItem.text}... (tap to view more)`,
        data: { post: feedItem.id },
      });
    });
    console.log(messages);
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
    feeditems_cache.force_reload();
    return res.send(messages);
    // PushHandler.sendPost(feedItem, channel, res)
    //   .then((res) => {
    //     feeditems_cache.force_reload();
    //   }).catch((err) => {
    //     console.log(`Error: ${err}`);
    //   });
  }
  console.log('PUSH FALSE');
  feeditems_cache.force_reload();
  console.log(feedItem);
  res.send(item);

  console.log('ABOUT TO RETURN');
  // HEY: this doesn't look like it sends receipts at all in the response, which is at least a nice confirmation
  // this appears to execute BEFORE PushHandler finishes
  return res.json(feedItem);
};

exports.activate = async (req, res) => {
  FeedItems.update({ _id: req.params.id }, {
    active: true,
  },
  (err, affected, resp) => {
    res.send(resp);
    feeditems_cache.force_reload();
  });
};

exports.deactivate = async (req, res) => {
  FeedItems.update({ _id: req.params.id }, {
    active: false,
  },
  (err, affected, resp) => {
    res.send(resp);
    feeditems_cache.force_reload();
  });
};

exports.delete = (req, res) => {
  FeedItems.findById(req.params.id, (error, feedItem) => {
    if (error) res.status(501).send({ error });

    Channels.findById(feedItem.channel.Id), (error, channel) => {
      if (error) {
        res.send(error);
      }
      const userHasPermission = channel.users.some((user) => user.canDelete && user._id === req.user._id);
      if (!userHasPermission) {
        res.status(401).send('You do not have permission to delete from this news feed channel!');
      }
      FeedItems.findByIdAndRemove(req.params.id, (error) => {
        error
          ? res.status(501).send({ error })
          : res.send({ message: `Deleted${req.params.id}` });
      });
    };
  });
};
