const feeditems = require("../models/feeditems");
const config = require("../config.js");
const passport = require("passport");
const permissions = require("../middleware/PermissionsMiddleware");

var feeditems_cache = {
  data: null,
  last_refresh: 0,
  force_reload: function (res) {
    var that = this;
    feeditems.find((error, feed) => {
      if (error) {
        that.data = null;
        that.last_refresh = 0;
        if (res != null) res.send(error);
      }
      that.data = feed;
      that.last_refresh = Date.now();
      if (res != null) res.send(that.data);
    });
  },
  send_data: function (res) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      this.force_reload(res);
    } else {
      res.send(this.data);
    }
  }
};

module.exports = app => {
  app.get("/api/feed", (req, res) => {
    feeditems_cache.send_data(res);
    // TODO: only return where .active=true
  });

  // TODO: require admin user credentials, feedAllowed permission, and channel.user.canCreate
  // creates feed item
  app.post(
    "/api/feed",
    (req, res) => {
      var feedItem = feeditems(req.body);
      feedItem.save((error, item) => {
        error ? res.status(501).send({ error }) : res.send(item);
        feeditems_cache.force_reload();
      });
    }
  );
}