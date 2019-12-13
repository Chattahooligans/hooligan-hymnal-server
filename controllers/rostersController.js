const mongoose = require("mongoose");
const Roster = mongoose.model("roster");

exports.index = async (req, res) => {
  const rosters = await Roster.find({}).sort({ active: "desc" });
  res.render("rosters/index", {
    title: "All Rosters",
    rosters
  });
};

exports.create = (req, res) => {
  res.render("rosters/create", {
    title: "Create Roster"
  });
};

exports.store = async (req, res) => {
  let values = {
    rosterTitle: req.body.rosterTitle,
    season: req.body.season
  };
  if (req.body.active == "on") {
    values.active = true;
  }
  if (req.body.default == "on") {
    values.default = true;
  }
  const roster = await new Roster(values).save();
  req.flash("success", `${roster.rosterTitle} created!`);
  res.redirect("/rosters");
};

exports.show = async (req, res) => {
  const roster = await Roster.findById(req.params.id);
  res.render("rosters/show", {
    title: `${roster.rosterTitle}`,
    roster
  });
};

exports.edit = async (req, res) => {
  const roster = await Roster.findById(req.params.id);
  res.render("rosters/edit", {
    title: `Edit ${roster.rosterTitle}`,
    roster
  });
};

exports.update = async (req, res) => {
  let updates = {
    rosterTitle: req.body.rosterTitle,
    season: req.body.season,
    active: false,
    default: false
  };
  if (req.body.active) {
    updates.active = true;
  }
  if (req.body.default) {
    updates.default = true;
  }
  const roster = await Roster.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      $set: updates
    },
    {
      new: true,
      runValidators: true,
      context: "query"
    }
  );
  req.flash("success", `${roster.rosterTitle} has been updated!`);
  res.redirect(`/rosters/${roster._id}`);
};

exports.deleteConfirm = async (req, res) => {
  const roster = await Roster.findById(req.params.id);
  res.render("rosters/delete", {
    title: `${roster.rosterTitle} Delete`
  });
};

exports.delete = async (req, res) => {
  const roster = await Roster.findByIdAndDelete(req.params.id);
  req.flash("success", `${roster.rosterTitle} has been deleted!`);
  res.redirect("/rosters");
};
