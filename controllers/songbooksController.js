const mongoose = require("mongoose");
const Songbook = mongoose.model("songbook");

exports.index = async (req, res) => {
  const songbooks = await Songbook.find({});
  res.render("songbooks/index", {
    title: "All Songbooks",
    songbooks
  });
};
exports.create = (req, res) => {
  res.render("songbooks/create", {
    title: "Create Songbook"
  });
};
exports.store = async (req, res) => {
  const songbook = new Songbook(req.body);
  await songbook.save();
  req.flash("success", `${songbook.title} was created`);
  res.redirect("/songbooks");
};
exports.show = async (req, res) => {
  const songbook = await Songbook.findById(req.params.id);
  res.render("songbooks/show", {
    title: `${songbook.songbook_title}`,
    songbook
  });
};
exports.edit = async (req, res) => {
  const songbook = await Songbook.findById(req.params.id);
  res.render("songbooks/edit", {
    title: `Edit ${songbook.songbook_title}`,
    songbook
  });
};
exports.update = async (req, res) => {
  const updates = {};
  const songbook = await Songbook.findOneAndUpdate(
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
  req.flash("success", `${songbook.songbook_title} was updated!`);
  res.redirect("back");
};
exports.deleteConfirm = async (req, res) => {
  const songbook = await Songbook.findById(req.params.id);
  res.render("songbooks/delete", {
    title: `Delete ${songbook.songbook_title}`,
    songbook
  });
};
exports.delete = async (req, res) => {
  const songbook = await Songbook.findByIdAndDelete(req.params.id);
  req.flash("success", `${songbook.songbook_title} was deleted!`);
  res.redirect("/songbooks");
};

