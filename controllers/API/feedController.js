const mongoose = require("mongoose");
const FeedItem = mongoose.model("FeedItem");
const Channel = mongoose.model("Channel");
const config = require("../../config");
// Is this required??
// const PushHandler = mongoose.model("PushHandler");

let feeditems_cache = {
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
			res.json(this.data);
		}
	},
	send_active: function (res) {
		if (this.last_refresh + config.cache_timeout < Date.now()) {
			this.force_reload(res, (data) => res.send(this.get_active_items(data)));
		} else {
			res.json(this.get_active_items(this.data));
		}
	},
	send_channel: function (res, channelId) {
		if (this.last_refresh + config.cache_timeout < Date.now()) {
			this.force_reload(res, (data) => res.send(this.get_channel_items(data, channelId)));
		} else {
			res.json(this.get_channel_items(this.data, channelId));
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

exports.activeFeed = (req, res) => {
	feeditems_cache.send_active(res);
};

exports.all = (req, res) => {
	feeditems_cache.send_data(res);
};

exports.show = async (req, res) => {
	const feedItem = await FeedItem.findById(req.params.id);
	res.json(feedItem);
};

exports.store = async (req, res, next) => {
	let feedItem = new FeedItem(req.body);
	const channel = await Channel.findById(feedItem.channel);
	let err = {};
	if (!channel) {
		err = new Error("No channel found with matching id");
		return next(err);
	}
	if(channel.users.some(user => user.canCreate && user._id === req.user._id)) {
		err = new Error("You do not have permission to post to this news feed channel!");
		err.status = 401;
		return next(err);
	}
	await feedItem.save();
	if (feedItem.push) {
		await PushHandler.sendPost(notification);
	}
	feeditems_cache.force_reload();
};

exports.destroy = async (req, res, next) => {
	const feedItem = await FeedItem.findById(req.params.id);
	const channel = await Channel.findById(feedItem.channel.id);
	let err = {};
	if (!channel) {
		err = new Error("No channel found with that id");
		return next(err);
	}
	if (!channel.users.some(user => user.canDelete && user._id === req.user._id)) {
		err = new Error("You do not have permission to delete from this news feed channel");
		err.status = 401;
		return next(err);
	}
	feedItem.remove();
	res.json({
		message: `Deleted ${feedItem._id}`
	});
};
