const mongoose = require("mongoose");
const Foes = mongoose.model("foes");
const config = require("../../config.js");
var foes_cache = {
	data: null,
	last_refresh: 0,
	force_reload: async function(res) {
		let that = this;
		const foes = await Foes.find();
		that.data = foes;
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
	await foes_cache.send_data(res);
};

exports.show = async (req, res) => {
	const foe = await Foes.findById(req.params.id);
	res.json(foe);
};

exports.store = async (req, res) => {
	const foe = new Foes(req.body);
	await Promise.all([foes_cache.force_reload(res), foe.save()]);
	res.json(foe);
};

exports.update = async (req, res) => {
	const foe = await Foes.findOneAndUpdate(
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
	await foes_cache.force_reload(res);
	res.json(foe);
};

exports.delete = async (req, res) => {
	const foe = await Foes.findByIdAndDelete(req.params.id);
	await foes_cache.force_reload(res);
	res.json({
		message: `${foe.opponent} was deleted`
	});
};
