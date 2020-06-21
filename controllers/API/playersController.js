const mongoose = require("mongoose");
const Players = mongoose.model("players");

exports.index = async (req, res) => {
	const players = await Players.find();
	return res.json(players);
};

exports.show = async (req, res) => {
	const player = await Players.findById(req.params.id);
	return res.json(player);
};
