const mongoose = require("mongoose");
const FeedItems = mongoose.model("feedItem");
const Channels = mongoose.model("channels");
const config = require("../config");
const { checkPermission } = require("../../middleware/PermissionsMiddleware");
// let PushHandler = require("../../models/pushHandler")

const feeditems_cache = {
	data: null,
	last_refresh: 0,
	force_reload: function(res, sendCallback) {
		const that = this;
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
	send_data: function(res) {
		if (this.last_refresh + config.cache_timeout < Date.now()) {
			this.force_reload(res, res.send);
		} else {
			res.send(this.data);
		}
	},
	send_active: function(res) {
		if (this.last_refresh + config.cache_timeout < Date.now()) {
			this.force_reload(res, data => res.send(this.get_active_items(data)));
		} else {
			res.send(this.get_active_items(this.data));
		}
	},
	send_channel: function(res, channelId) {
		if (this.last_refresh + config.cache_timeout < Date.now()) {
			this.force_reload(res, data => res.send(this.get_channel_items(data, channelId)));
		} else {
			res.send(this.get_channel_items(this.data, channelId));
		}
	},
	get_active_items(data) {
		let active = [];
		for(let i = 0; i < data.length; i++) {
			if (data[i].active) {
				active.push(data[i]);
			}
		}
		return active;
	},
	get_channel_items(data, channelId) {
		let items = [];
		for (let i = 0; i < data.length; i++) {
			if (data[i].channel == channelId && data[i].channel) {
				items.push(data[i]);
			}
		}
		return items;
	}
};

exports.index = (req, res) => {
	feeditems_cache.send_active(res);
};

exports.all = (req, res) => {
	feeditems_cache.send_data(res);
};

exports.show = (req, res, next) => {
	FeedItems.findById(req.params.id, (err, feedItem) => {
		if (err) {
			return next(err);
		}
		res.json(feedItem);
	});
};

exports.channelId = (req, res) => {
	feeditems_cache.send_channel(res, req.params.id);
};

exports.store = (req, res, next) => {
	let feedItem = new FeedItems(req.body);
	Channels.findById(feedItem.channel, (error, channel) => {
		if (error) {
			return next(error);
		}
		if (!channel.users.some(user => user.canCreate && String(user._id) == String(req.user._id))) {
			let err = {};
			err = new Error("You do not have permission to post to this news feed channel");
			err.status = 401;
			return next(err);
		}
		feedItem.save((error, item) => {
			if (error) {
				return next(error);
			}
			if (feedItem.push) {
				// Send a push notification here
				// need to translate feedItem into a Notification Object first
				// TODO currently, this means that Notification form will be sent back, not the feedItem.
				PushHandler.sendPost(notification)
					.then(function(results) {
						results.notification = notification;
						res.json(results);
					}).catch(function(error) {
						// TODO: return an error would be cleaner
						console.log(`error 2: ${error}`);
						let err = {};
						err = new Error(`Error fetching push tokens: ${error}`);
						err.status = 501;
						return next(err);
					});
			}
			feeditems_cache.force_reload();
		});
	});
};

exports.destroy = (req, res, next) => {
	FeedItems.findById(req.params.id, (error, feedItem) => {
		if (error) {
			let err = {};
			err = new Error(error);
			err.status = 501;
			return next(err);
		}
		Channels.findById(feedItem.channel, (error, channel) => {
			if (error) {
				let err = {};
				err = error;
				return next(err);
			}
			if (!channel.users.some(user => user.canDelete && user._id === req.user._id)) {
				let err = {};
				err = new Error("You do not have permission to delete from this news feed channel!");
				err.status = 401;
				return next(err);
			}
			FeedItems.findById(req.params.id, error => {
				if (error) {
					let err = {};
					err = error;
					err.status = 501;
					return next(err);
				}
				res.json({
					message: `Deleted ${req.params.id}`
				});
			});
		});
	});
};

// TODO: Image upload to cloudinary
