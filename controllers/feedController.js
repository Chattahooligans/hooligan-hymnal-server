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
      that.data = feed;
      that.last_refresh = Date.now();
      if (res != null) {
        sendCallback(that.data);
      }
    });
  },
  send_data: function (res) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      this.force_reload(res, res.send);
    } else {
      res.send(this.data);
    }
  },
  send_active: function(res) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      this.force_reload(res, (data) => res.send(this.get_active_items(data)));
    } else {
      res.send(this.get_active_items(this.data));
    }
  },
  send_channel: function(res, channelId) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      this.force_reload(res, (data) => res.send(this.get_channel_items(data, channelId)));
    } else {
      res.send(this.get_channel_items(this.data, channelId));
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
  }
};

module.exports = app => {
  app.get("/api/feed", (req, res) => {
    feeditems_cache.send_active(res);
  });

  app.get("/api/feed/all", (req, res) => {
    feeditems_cache.send_data(res);
  });

  // returns single item by _id
  app.get("/api/feed/:id", (req, res) => {
    FeedItems.findById(req.params.id, (error, feedItem) => {
      res.send(feedItem);
    });
  });

  app.get("/api/feed/channel/:id", (req, res) => {
    feeditems_cache.send_channel(res, req.params.id);
  });

  // creates feed item
  app.post(
    "/api/feed",
    passport.authenticate("jwt", { session: false }),
    permissions("feedAllowed"),
    (req, res) => {
      console.log(req.body);
      var feedItem = FeedItems(req.body);
      console.log(feedItem);
      Channels.findById(feedItem.channel), (error, channel) => {
        console.log(channel);
        if(error) {
          res.send(error);
        }
        var userHasPermission = channel.users.some((user) => user.canCreate && user._id === req.user._id);
        if(!userHasPermission) {
          res.status(401).send("You do not have permission to post to this news feed channel!");
        }
        feedItem.save((error, item) => {
          error ? res.status(501).send({ error }) : res.send(item);
          if(feedItem.push) {
            //send a push notification here
            //need to translate feedItem into a Notification object first
            //TODO? currently, this means that the Notification form will be sent back, not the feedItem.
            PushHandler.sendPost(notification)
            .then(function(results) {
              results.notification = notification;
              res.send(results);
            }).catch(function(error) {
              //TODO: returning an error would be cleaner
              console.log("error 2: ", error);
              res
                .status(501)
                .send({ error: `Error fetching push tokens: ${error}` });
              return;
            });
          }
          feeditems_cache.force_reload();
        });
      }
    }
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