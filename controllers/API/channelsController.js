const channels = require("../../models/channels");
const config = require("../../config.js");

var channels_cache = {
  data: null,
  last_refresh: 0,
  force_reload: function (res, sendCallback) {
    var that = this;
    channels.find((error, channels) => {
      if (error) {
        that.data = null;
        that.last_refresh = 0;
        if (res != null) res.send(error);
      }
      that.data = channels;
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
  get_active_items(data) {
    var active = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].active) active.push(data[i]);
    }
    return active;
  },
};

exports.active = async (req, res) => {
  channels_cache.send_active(res);
};

exports.all = async (req, res) => {
  channels_cache.send_data(res);
};

exports.store = async (req, res) => {
  var channel = channels(req.body);
  channel.save((error, channel) => {
    error ? res.status(501).send({ error }) : res.send(channel);
    channels_cache.force_reload();
  });
};