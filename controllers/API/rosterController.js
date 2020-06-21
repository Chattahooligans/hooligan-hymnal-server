const mongoose = require("mongoose");
const Roster = mongoose.model("roster");

exports.index = async (req, res) => {
  const rosters = await Roster.find();
  return res.json(rosters);
};

exports.active = async (req, res) => {
  const activeRosters = await Roster.find({ active: true });
  return res.json(activeRosters);
};

exports.show = async (req, res) => {
  const roster = await Roster.findById(req.params.id);
  res.json(roster);
};
