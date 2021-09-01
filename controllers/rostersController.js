const mongoose = require("mongoose");
const Roster = mongoose.model("roster");
const Players = mongoose.model("players");

const { deleteCache } = require('../middleware/cacheMiddleware');

const DELETE_ROSTERS_CACHE = () => deleteCache('rosters');

exports.index = async (req, res) => {
  const rosters = await Roster.find()
    .sort({ active: "desc" });
  res.render("rosters/index", {
    title: "All Rosters",
    rosters
  });
};

exports.create = async (req, res) => {
  const players = await Players.find({})
    .select('_id name position squadNumber')
    .sort('name');
  res.render("rosters/create", {
    title: "Create Roster",
    players
  });
};

exports.store = async (req, res) => {
  let values = {}
  Object.keys(req.body).forEach(key => {
    values[key] = req.body[key];
  })
  if (req.body.players) {
    values['players'] = req.body['players'].map(p => JSON.parse(p));
  }
  if (req.body.active == "on") {
    values.active = true;
  }
  if (req.body.default == "on") {
    values.default = true;
  }
  const roster = await new Roster(values).save();
  DELETE_ROSTERS_CACHE();
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
  const rosterPromise = Roster.findById(req.params.id);
  const playersPromise = Players.find({})
    .select('_id name position squadNumber')
    .sort('name');

  const [roster, players] = await Promise.all([rosterPromise, playersPromise]);

  res.render("rosters/edit", {
    title: `Edit ${roster.rosterTitle}`,
    roster,
    players
  });
};

exports.update = async (req, res) => {
  let updates = {
    rosterTitle: req.body.rosterTitle,
    season: req.body.season,
    active: false,
    default: false,
    players: req.body.players
      ? req.body.players.map((pl) => JSON.parse(pl))
      : [],
    active: req.body.active ? true : false,
    default: req.body.default ? true : false
  };
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
  const defaultRostersCount = await Roster.find({
      default: true
  }).countDocuments()
  if (defaultRostersCount == 0) {
      updates.default = true;
      await Roster.findOneAndUpdate(
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
      )
      req.flash("info", `${roster.rosterTitle} was set to default because there were no others set to default`);
  }
  DELETE_ROSTERS_CACHE();
  req.flash("success", `${roster.rosterTitle} has been updated!`);
  res.redirect(`/rosters/${roster._id}`);
};

exports.duplicate = async (req, res) => {
	const rosterPromise = Roster.findById(req.params.id);
	const playersPromise = Players.find({})
		.select('_id name position')
		.sort('name')

	const [roster, players] = await Promise.all([rosterPromise, playersPromise])

	res.render("rosters/duplicate", {
		title: `Duplicate ${roster.rosterTitle}`,
		roster,
		players,
	})
}

exports.duplicateSave = async (req, res) => {
	let values = {
		rosterTitle: req.body.rosterTitle,
		season: req.body.season,
		players: req.body.players ? req.body.players.map((pl) => JSON.parse(pl)) : [],
		active: req.body.active ? true : false,
		default: req.body.default ? true : false
	}

	const roster = await new Roster(values).save()
	DELETE_ROSTERS_CACHE()
	req.flash("success", `${roster.rosterTitle} was created from a duplicate.`)
	return res.redirect(`/rosters/${roster.id}`)
}

exports.deleteConfirm = async (req, res) => {
  const roster = await Roster.findById(req.params.id);
  res.render("rosters/delete", {
    title: `${roster.rosterTitle} Delete`,
    roster
  });
};

exports.delete = async (req, res) => {
  const roster = await Roster.findByIdAndDelete(req.params.id);
  DELETE_ROSTERS_CACHE();
  req.flash("success", `${roster.rosterTitle} has been deleted!`);
  res.redirect("/rosters");
};
