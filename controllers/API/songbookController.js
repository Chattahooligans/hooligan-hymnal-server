const mongoose = require("mongoose");
const Songbook = mongoose.model("songbook");

exports.index = async (req, res) => {
	const songbooks = await Songbook.find({});
	return res.json(songbooks);
};

exports.show = async (req, res) => {
	const songbook = await Songbook.findById(req.params.id);
	return res.json(songbook);
};
