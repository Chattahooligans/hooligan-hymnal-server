// const Roster = require("../../models/roster");
const mongoose = require("mongoose");
const Roster = mongoose.model("roster");
const config = require("../../config.js");
var roster_cache = {
  data: null,
  last_refresh: 0,
  force_reload: async function(res, activeOnly) {
    var that = this;
    const roster = await Roster.find({});
    that.data = roster;
    that.last_refresh = Date.now();
    if (activeOnly) {
      res.json(this.get_active_rosters(this.data));
    } else {
      res.json(that.data);
    }
  },
  send_data: async function(res) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      await this.force_reload(res);
    } else {
      res.send(this.data);
    }
  },
  send_active: async function(res) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      await this.force_reload(res, true);
    } else {
      res.send(this.get_active_rosters(this.data));
    }
  },
  get_active_rosters(data) {
    var active = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].active) active.push(data[i]);
    }
    return active;
  }
};

exports.index = async (req, res) => {
  await roster_cache.send_data(res);
};

exports.active = async (req, res) => {
  await roster_cache.send_active(res);
};

exports.show = async (req, res) => {
  const roster = await Roster.findById(req.params.id);
  res.json(roster);
};
