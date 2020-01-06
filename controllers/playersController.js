const mongoose = require("mongoose");
const Player = mongoose.model("players");

exports.index = async (req, res) => {
  const players = await Player.find();
  res.render("players/index", {
    title: "All Players",
    players
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
  const player = await Player.findOneAndDelete(req.params.id);
  req.flash("success", `${player.name} was deleted!`);
  res.redirect("/players");
};
