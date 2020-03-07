const mongoose = require('mongoose');

const FeedItems = mongoose.model('feedItem');
const Channels = mongoose.model('channels');
const { Expo } = require('expo-server-sdk');

const PushTokens = mongoose.model('pushTokens');
const moment = require('moment');
const { sendPush } = require('../../models/pushHandler');
// const FeedItems = require('../../models/feeditems');
// const Channels = require('../../models/channels');
const config = require('../../config.js');
const PushHandler = require('../../models/pushHandler');
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

    feeditems_cache.force_reload();

    return res.json({
      feedItem,
      receipts,
      errors,
    });
  }
  else {
    feeditems_cache.force_reload();

    return res.json(feedItem);
  }
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
