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

exports.removeTeam = async (req, res) => {
	let players = await Players.find();
	for (const player of players) {
		Players.findOneAndUpdate({_id: player._id}, {
			$unset: {
				team: undefined
			}
		}, (err, p) => {
			if (err) res.send(err);
		});
		// const player = Players.findOne({_id: player._id});
		// console.log(player);
		// console.log(player._id);
	}
	res.send("done");
};
