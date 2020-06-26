const mongoose = require("mongoose");
const GoalkeeperNickname = mongoose.model("goalkeeperNickname");

exports.last = async (req, res) => {
	const goalkeeperNickname = await GoalkeeperNickname.find()
		.sort({
			createAt: -1
		})
		.limit(1);
	res.json(goalkeeperNickname[0]);
};

exports.index = async (req, res) => {
	const goalkeepers_nicknames = await GoalkeeperNickname.find();
	return res.json(goalkeepers_nicknames);
};

