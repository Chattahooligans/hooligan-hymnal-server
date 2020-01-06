const mongoose = require("mongoose");
const Player = mongoose.model("players");
const Roster = mongoose.model("roster");

exports.index = async (req, res) => {
  const playersPromise = Player.find();
  const rosterPromise = Roster.findById(req.params.id);
  const [players, roster] = await Promise.all([playersPromise, rosterPromise]);
  res.render("rosterPlayers/index", {
    title: `Add Player(s) to ${roster.rosterTitle}`,
    players,
    roster
  });
};

// /rosters/:rosterId/add-player/:playerId
exports.create = async (req, res) => {
  const playerPromise = Player.findById(req.params.playerId);
  const rosterPromise = Roster.findById(req.params.rosterId);
  const [player, roster] = await Promise.all([playerPromise, rosterPromise]);
  res.render("rosterPlayers/create", {
    title: `Add ${player.name} to ${roster.rosterTitle}`,
    player,
    roster
  });
};

exports.store = async (req, res) => {
  const roster = await Roster.findById(req.params.rosterId);
  const newPlayer = {
    _id: req.params.playerId,
    hint: req.body.hint
  };
  roster.players.push(newPlayer);
  await roster.save();
  req.flash("success", `${newPlayer.hint} was added to ${roster.rosterTitle}`);
  res.redirect(`/rosters/${roster._id}`);
};

("/rosters/:rosterId/players/:playerId/edit");
exports.edit = async (req, res) => {
  const roster = await Roster.findById(req.params.rosterId);
  const player = await roster.players.id(req.params.playerId);
  res.render("rosterPlayers/edit", {
    title: `Edit ${player.hint}`,
    player
  });
};

exports.update = async (req, res) => {
  const roster = await Roster.findById(req.params.rosterId);
  let player = await roster.players.id(req.params.playerId);
  player.hint = req.body.hint;
  roster.save();
  req.flash("success", `${player.hint} Updated!`);
  res.redirect(`/rosters/${roster._id}`);
};

exports.deleteConfirm = async (req, res) => {
  const roster = await Roster.findById(req.params.rosterId);
  const player = await roster.players.id(req.params.playerId);
  res.render("rosterPlayers/delete", {
    title: `Remove ${player.hint} from ${roster.rosterTitle}`,
    roster,
    player
  });
};

exports.delete = async (req, res) => {
  const roster = await Roster.findById(req.params.rosterId);
  const player = await roster.players.id(req.params.playerId);
  await roster.players.remove(player._id);
  await roster.save();
  req.flash("success", `${player.hint} was removed from ${roster.rosterTitle}`);
  res.redirect(`/rosters/${roster._id}`);
};
