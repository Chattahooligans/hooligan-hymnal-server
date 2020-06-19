const mongoose = require('mongoose');

const FeedItems = mongoose.model('feedItem');
const Channels = mongoose.model('channels');
const { Expo } = require('expo-server-sdk');

const PushTokens = mongoose.model('pushTokens');
const moment = require('moment');
const { sendPush } = require('../../models/pushHandler');
// const FeedItems = require('../../models/feeditems');
// const Channels = require('../../models/channels');
const PushHandler = require('../../models/pushHandler');
const { upload } = require('../../handlers/imageUploader');
const { deleteCache } = require('../../middleware/cacheMiddleware');

const DELETE_FEED_CACHE = () => deleteCache('feed');

exports.active = async (req, res) => {
  let { limit, publishedBefore } = req.query;
  if (!publishedBefore) {
    publishedBefore = new Date();
  }
  if (!limit) {
    limit = 20;
  }
  publishedBefore = Date.parse(publishedBefore);
  console.log(publishedBefore);
  const feed = await FeedItems.find({
    publishedAt: {
      $lt: publishedBefore
    },
    active: true
  }).limit(limit)
  return res.json(feed);
};

exports.all = async (req, res) => {
  let { limit, publishedBefore } = req.query;
  if (!publishedBefore) {
    publishedBefore = new Date();
  }
  if (!limit) {
    limit = 20;
  }
  publishedBefore = Date.parse(publishedBefore);
  console.log(publishedBefore);
  const feed = await FeedItems.find({
    publishedAt: {
      $lt: publishedBefore
    },
    active: true
  }).limit(limit)
  return res.json(feed);
};

exports.show = async (req, res) => {
  const feedItem = await FeedItems.findById(req.params.id);
  return res.json(feedItem);
};

exports.channel = async (req, res) => {
  let { limit, publishedBefore } = req.query;
  if (!publishedBefore) {
    publishedBefore = new Date();
  }
  publishedBefore = Date.parse(publishedBefore);
  if (!limit) {
    limit = 20;
  }
  const feedChannelItems = await FeedItems.find({
    publishedAt: {
      $lt: publishedBefore
    },
    channel: req.params.id
  }).limit(limit);
  return res.json(feedChannelItems);
};

exports.store = async (req, res) => {
  const feedItemImages = [];

  req.body.active = true;
  const channel = await Channels.findById(req.body.channel);
  const sender = JSON.parse(req.body.sender);
  const senderToken = await PushTokens.findOne({ pushToken: sender.pushToken });
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

  const userHasPostPermission = channel.users.some((user) => user.canCreate && String(user._id) === String(req.user._id));
  const userHasPushPermission = channel.users.some((user) => user.canPush && String(user._id) === String(req.user._id));
  if (!userHasPostPermission) {
    return res.status(401).send('You do not have permission to post to this news feed channel');
  }
  if(data.push && !userHasPushPermission) {
    return res.status(401).send('You do not have permission to push to this news feed channel');
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
      uploadMetadata = req.body.metadata;
    } else {
      uploadMetadata.push(req.body.metadata);
    }

    images.forEach((image, index) => {
      const thisMetadata = JSON.parse(uploadMetadata[index]);
      const targetIndex = thisMetadata.index;

      const thisImage = {
        uri: image.url,
        metadata: thisMetadata,
      };

      delete thisImage.metadata.index;

      feedItemImages[targetIndex] = thisImage;
    });
  }

  if (req.body.remoteImages) {
    // if there's only one item, turn it into an array
    let remoteImages = [];
    let remoteMetadata = [];
    if (Array.isArray(req.body.remoteImages)) {
      remoteImages = req.body.remoteImages;
      remoteMetadata = req.body.remoteMetadata;
    } else {
      remoteImages.push(req.body.remoteImages);
      remoteMetadata.push(req.body.remoteMetadata);
    }

    remoteImages.forEach((image, index) => {
      const parsedImage = JSON.parse(image);
      const thisMetadata = JSON.parse(remoteMetadata[index]);
      const targetIndex = thisMetadata.index;

      const thisImage = {
        uri: parsedImage.uri,
        thumbnailUri: parsedImage.thumbnailUri,
        metadata: thisMetadata,
      };

      delete thisImage.metadata.index;
      feedItemImages[targetIndex] = thisImage;
    });
  }

  const feedItem = await (new FeedItems(data)).save();
  if (feedItem.push) {
    const { receipts, errors } = await PushHandler.sendPost(feedItem, channel, senderToken);

    DELETE_FEED_CACHE();

    return res.json({
      feedItem,
      receipts,
      errors,
    });
  }
  else {
    DELETE_FEED_CACHE();

    return res.json(feedItem);
  }
};

exports.activate = async (req, res) => {
  FeedItems.findById(req.params.id, (error, feedItem) => {
    if (error) {
      res.status(501).send({ error });
    }
    Channels.findById(feedItem.channel.Id), (error, channel) => {
      if (error) {
        res.send(error);
      }
      const userHasPermission = channel.users.some((user) => user.canEdit && user._id === req.user._id);
      if (!userHasPermission) {
        res.status(401).send('You do not have permission to activate from this news feed channel!');
      }
      FeedItems.update({ _id: req.params.id }, {
        active: true,
      },
      (err, affected, resp) => {
          DELETE_FEED_CACHE();
          return res.send(resp);
      });
    };
  });
};

exports.deactivate = async (req, res) => {
  FeedItems.findById(req.params.id, (error, feedItem) => {
    if (error) {
      res.status(501).send({ error });
    }
    Channels.findById(feedItem.channel.Id), (error, channel) => {
      if (error) {
        res.send(error);
      }
      const userHasPermission = channel.users.some((user) => user.canEdit && user._id === req.user._id);
      if (!userHasPermission) {
        res.status(401).send('You do not have permission to deactivate from this news feed channel!');
      }
      FeedItems.update({ _id: req.params.id }, {
        active: false,
      },
      (err, affected, resp) => {
          DELETE_FEED_CACHE();
          return res.send(resp);
      });
    };
  });
};

exports.delete = (req, res) => {
  FeedItems.findById(req.params.id, (error, feedItem) => {
    if (error) {
      res.status(501).send({ error });
    }
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
