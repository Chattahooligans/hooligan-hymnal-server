const mongoose = require("mongoose");
const Players = mongoose.model("players");
let config = require("../../config.js");

var players_cache = {
	data: null,
	last_refresh: 0,
	force_reload: async function(res) {
		var that = this;
		const players = await Players.find();
		that.data = players;
		that.last_refresh = Date.now();
		res.send(that.data);
	},
	send_data: async function(res) {
		if (this.last_refresh + config.cache_timeout < Date.now()) {
			await this.force_reload(res);
		} else {
			res.send(this.data);
		}
	}
};

exports.index = async (req, res) => {
	await players_cache.send_data(res);
};

exports.show = async (req, res) => {
	const player = await Players.findById(req.params.id);
	res.json(player);
};
