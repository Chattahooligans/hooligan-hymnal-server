require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const Player = mongoose.model("players");

exports.index = async (req, res) => {
	const page = req.query.page || 1;
	const limit = 10;
	const skip = (page * limit) - limit;
	const name = req.query.name || "";
	console.log(name);

	const playersPromise = Player
		.find({
			name: {
				$regex: `.*${name}.*`,
				$options: "i"
			}
		})
		.skip(skip)
		.limit(limit)
		.sort({ "name": "asc" });

	const countPromise = Player.count();
	const searchCountPromise = Player.find({
		name: {
			$regex: `.*${name}.*`,
			$options: "i"
		}
	}).count();
	const [players, totalCount, searchCount] = await Promise.all([playersPromise, countPromise, searchCountPromise]);
	const pages = Math.ceil((searchCount ? searchCount : totalCount) / limit);
	if (!players.length && skip) {
		req.flash("error", `Hey! You asked for page ${page}. But that dosen't exist. So I put you on page ${pages}`);
		res.redirect(`/players?page=${pages}`);
	}

	res.render("players/index", {
		title: "All Players",
		players,
		totalCount,
		searchCount,
		skip,
		page,
		pages,
		name
	});
};

exports.search = async (req, res) => {
	const name = req.query.name || "";
	const page = req.query.page || 1;
	const limit = 10;
	const skip = (page * limit) - limit;

	const playersPromise = Player
		.find({
			name: {
				$regex: `.*${name}.*`,
				$options: "i"
			}
		})
		.skip(skip)
		.limit(limit)
		.sort({ "name": "asc" });
	const totalCountPromise = Player.count();
	const searchCountPromise = Player.find({
		name: {
			$regex: `.*${name}.*`,
			$options: "i"
		}
	}).count();
	const [players, totalCount, searchCount] = await Promise.all([playersPromise, totalCountPromise, searchCountPromise]);
	const pages = Math.ceil(searchCount / limit);

	res.render("players/_playersList", {
		players,
		name,
		skip,
		page,
		pages,
		totalCount,
		searchCount
	});
};

exports.create = (req, res) => {
	res.render("players/create", {
		title: "Create Player"
	});
};

exports.store = async (req, res) => {
	const player = new Player(req.body);
	await player.save();
	req.flash("success", `${player.name} was successfully created!`);
	res.redirect("/players");
};

exports.show = async (req, res) => {
	const player = await Player.findById(req.params.id);
	res.render("players/show", {
		title: `${player.name}`,
		player
	});
};

exports.edit = async (req, res) => {
	const player = await Player.findById(req.params.id);
	res.render("players/edit", {
		title: `Edit ${player.name}`,
		player
	});
};

exports.update = async (req, res) => {
	const player = await Player.findOneAndUpdate(
		{
			_id: req.params.id
		},
		{
			$set: req.body
		},
		{
			new: true,
			runValidators: true,
			context: "query"
		}
	);
	req.flash("success", `${player.name} was updated`);
	res.redirect(`/players/${player._id}`);
};

exports.deleteConfirm = async (req, res) => {
	const player = await Player.findById(req.params.id);
	res.render("players/delete", {
		title: `${player.name} Delete`,
		player
	});
};

exports.delete = async (req, res) => {
	const { name } = req.body;
	if (!name) {
		req.flash("error", "Name not provided or names did not match");
		return res.redirect("back");
	}
	const player = await Player.findById(req.params.id);
	if (name !== player.name) {
		req.flash("error", "The name didn't match please try again.");
		return res.redirect("back");
	}
	await player.remove();
	req.flash("success", `${player.name} was deleted!`);
	res.redirect("/players");
};

exports.uploadPage = (req, res) => {
	res.render("players/uploadTest", {
		title: "Upload Test"
	});
};

exports.uploads = (file, folder) => {
	return new Promise(resolve => {
		cloudinary.uploader.upload(file, result => {
			resolve({
				url: result.url,
				id: result.public_id
			}, {
				resource_type: "auto",
				folder: folder
			});
		});
	});
};

const { upload } = require("../handlers/imageUploader");

/**
 * @param {Request} req
 * @param {Response} res
 */
exports.upload = async (req, res) => {
	const image = await upload(req, {
		transformation: {
			width: 200,
			height: 200,
			crop: "scale"
		},
		folder: "players_thumbnails"
	});
	res.json({
		url: image.url,
		id: image.public_id
	});
};
