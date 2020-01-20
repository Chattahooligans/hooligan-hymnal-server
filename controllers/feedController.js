const FeedItems = require("../models/feeditems");
const Channels = require("../models/channels");
const config = require("../config.js");
const passport = require("passport");
const permissions = require("../middleware/PermissionsMiddleware");
let PushHandler = require("../models/pushHandler");

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
  send_data: function (res, createdBefore, limit) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      this.force_reload(res, (data) => res.send(
        this.filter_data(data, createdBefore, limit)));
    } else {
      res.send(this.filter_data(this.data, createdBefore, limit));
    }
  },
  send_active: function(res, createdBefore, limit) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      this.force_reload(res, (data) => res.send(
        this.filter_data(
          this.get_active_items(data), createdBefore, limit) 
          ));
    } else {
      res.send(this.filter_data(this.get_active_items(this.data), createdBefore, limit));
    }
  },
  send_channel: function(res, channelId, createdBefore, limit) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      this.force_reload(res, (data) => res.send(
        this.filter_data(
          this.get_channel_items(data, channelId), createdBefore, limit) 
          ));
    } else {
      res.send(this.filter_data(this.get_channel_items(this.data, channelId), createdBefore, limit));
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
  filter_data(data, createdBefore, limit) {
    limit = parseInt(limit);
    createdBefore = Date.parse(createdBefore);
    if (!createdBefore || !limit) return data;
    var filtered = data.filter(i => i.publishedAt < createdBefore);
    return filtered.slice(0, limit);
  }
};

module.exports = app => {
  app.get("/api/feed", (req, res) => {
    feeditems_cache.send_active(res, req.query.createdBefore, req.query.limit);
  });

  app.get("/api/feed/all", (req, res) => {
    feeditems_cache.send_data(res, req.query.createdBefore, req.query.limit);
  });

  // returns single item by _id
  app.get("/api/feed/:id", (req, res) => {
    FeedItems.findById(req.params.id, (error, feedItem) => {
      res.send(feedItem);
    });
  });

  app.get("/api/feed/channel/:id", (req, res) => {
    feeditems_cache.send_channel(res, req.params.id, req.query.createdBefore, req.query.limit);
  });

  // creates feed item
  app.post(
    "/api/feed",
    passport.authenticate("jwt", { session: false }),
    permissions("feedAllowed"),
    (req, res) => {
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
            PushHandler.sendPost(feedItem)
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
      )}
  );

  // TODO: API for a user to delete a post (set .active=false), from post _id and user permissions
  app.delete(
    "/api/notification/:id",
    passport.authenticate("jwt", { session: false }),
    permissions("feedAllowed"),
    (req, res) => {
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
    }
  );

  // TODO: Research image upload to cloudinary for near-future use
}