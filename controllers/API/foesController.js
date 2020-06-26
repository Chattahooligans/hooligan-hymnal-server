const mongoose = require('mongoose');
const Foes = mongoose.model('foes');

exports.index = async (req, res) => {
  const foes = await Foes.find({});
  return res.json(foes);
};

exports.show = async (req, res) => {
  const foe = await Foes.findById(req.params.id);
  return res.json(foe);
};
