const mongoose = require("mongoose");
const Songbook = mongoose.model("songbook");
const config = require("../../config.js");

var songbook_cache = {
	data: null,
	last_refresh: 0,
	force_reload: async function(res) {
		var that = this;
		const songbooks = await Songbook.find();
		if (!songbooks.length) {
			that.data = null;
			that.last_refresh = 0;
			res.json(songbooks);
		}
		that.data = songbooks;
		that.last_refresh = Date.now();
		return res.json(songbooks);
	},
	send_data: async function(res) {
		if (this.last_refresh + config.cache_timeout < Date.now()) {
			await this.force_reload(res);
		} else {
			return res.json(this.data);
		}
	}
};

exports.index = async (req, res) => {
	await songbook_cache.send_data(res);
};

exports.show = async (req, res) => {
	const songbook = await Songbook.findById(req.params.id);
	res.json(songbook);
};
