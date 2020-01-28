const FeedItems = require("../../models/feeditems");
const Channels = require("../../models/channels");
const config = require("../../config.js");
let PushHandler = require("../../models/pushHandler");

var feeditems_cache = {
  data: null,
  last_refresh: 0,
  force_reload: function (res, sendCallback) {
    var that = this;
    FeedItems.find((error, feed) => {
      if (error) {
        that.data = null;
        that.last_refresh = 0;
        if (res != null) res.send(error);
      }
      //sort cache on publishedAt, descending
      that.data = feed.sort((a, b) => a.publishedAt < b.publishedAt ? 1 : -1);
      that.last_refresh = Date.now();
      if (res != null) {
        sendCallback(that.data);
      }
    });
  },
  send_data: function (res, publishedBefore, limit) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      this.force_reload(res, (data) => res.send(
        this.filter_data(data, publishedBefore, limit)));
    } else {
      res.send(this.filter_data(this.data, publishedBefore, limit));
    }
  },
  send_active: function(res, publishedBefore, limit) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      this.force_reload(res, (data) => res.send(
        this.filter_data(
          this.get_active_items(data), publishedBefore, limit)
          ));
    } else {
      res.send(this.filter_data(this.get_active_items(this.data), publishedBefore, limit));
    }
  },
  send_channel: function(res, channelId, publishedBefore, limit) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      this.force_reload(res, (data) => res.send(
        this.filter_data(
          this.get_channel_items(data, channelId), publishedBefore, limit)
          ));
    } else {
      res.send(this.filter_data(this.get_channel_items(this.data, channelId), publishedBefore, limit));
    }
  },
  get_active_items(data) {
    var active = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].active) active.push(data[i]);
    }
    return active;
  },
  get_channel_items(data, channelId) {
    var items = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].channel == channelId && data[i].channel) items.push(data[i]);
    }
    return items;
  },
  filter_data(data, publishedBefore, limit) {
    limit = parseInt(limit);
    publishedBefore = Date.parse(publishedBefore);    console.log(publishedBefore);
    if (!publishedBefore) publishedBefore = new Date();
    if(!limit) limit = 20;
    var filtered = data.filter(i => i.publishedAt < publishedBefore);
    return filtered.slice(0, limit);
  }
};

exports.active = async (req, res) => {
  feeditems_cache.send_active(res, req.query.publishedBefore, req.query.limit);
};

exports.all = async(req, res) => {
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
  var feedItem = FeedItems(req.body);
  feedItem.active = true;
  Channels.findById(feedItem.channel, (error, channel) => {
    if(error) {
      res.send(error);
    }
    var userHasPermission = channel.users.some((user) => user.canCreate && String(user._id) == String(req.user._id));
    if(!userHasPermission) {
      res.status(401).send("You do not have permission to post to this news feed channel!");
      return;
    }
    feedItem.save((error, item) => {
      error ? res.status(501).send({ error }) : res.send(item);
      if(feedItem.push) {
        //send a push notification here
        //need to translate feedItem into a Notification object first
        //TODO? currently, this means that the Notification form will be sent back, not the feedItem.
        PushHandler.sendPost(feedItem, channel)
        .then(function(results) {
          feeditems_cache.force_reload();
        }).catch(function(error) {
          //TODO: returning an error would be cleaner
          console.log("error 2: ", error);
          res
            .status(501)
            .send({ error: `Error fetching push tokens: ${error}` });
          return;
        });
      } else {
        feeditems_cache.force_reload();
      }
    });
  }
)};

exports.activate = async (req, res) => {
  FeedItems.update({_id: req.params.id}, {
    active: true
  }, 
  function(err, affected, resp) {
    res.send(resp);
  });
};

exports.deactivate = async (req, res) => {
  FeedItems.update({_id: req.params.id}, {
    active: false
  }, 
  function(err, affected, resp) {
    res.send(resp);
  });
};

exports.delete = (req, res) => {
  FeedItems.findById(req.params.id, (error, feedItem) => {
    if(error) res.status(501).send({error});

    Channels.findById(feedItem.channel.Id), (error, channel) => {
      if(error) {
        res.send(error);
      }
      var userHasPermission = channel.users.some((user) => user.canDelete && user._id === req.user._id);
      if(!userHasPermission) {
        res.status(401).send("You do not have permission to delete from this news feed channel!");
      }
      FeedItems.findByIdAndRemove(req.params.id, error => {
        error
          ? res.status(501).send({ error })
          : res.send({ message: "Deleted" + req.params.id });
      });
    }
  });
};
