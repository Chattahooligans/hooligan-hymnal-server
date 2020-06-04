const mongoose = require("mongoose");
const Songs = mongoose.model("song");
const Players = mongoose.model("players");

exports.index = async (req, res) => {
	const songs = await Songs.find({});
	return res.json(songs);
};

exports.show = async (req, res) => {
	let song = await Songs.findById(req.params.id);
	if (song.playerId) {
		const player = await Players.findById(song.playerId);
		song.player = player;
	}
	return res.json(song);
};
