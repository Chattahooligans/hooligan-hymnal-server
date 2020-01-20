const mongoose = require("mongoose");
const Song = mongoose.model("song");

exports.index = async (req, res) => {
  const songs = await Song.find();
  res.render("songs/index", {
    title: "All Songs",
    songs
  });
};
exports.create = (req, res) => {
  res.render("songs/create", {
    title: "Create Song"
  });
};
exports.store = async (req, res) => {
  const song = await new Song(req.body).save();
  req.flash("success", `${song.title} was created!`);
  res.redirect("/songs");
};
exports.show = async (req, res) => {
  const song = await Song.findById(req.params.id);
  res.render("songs/show", {
    title: `${song.title}`,
    song
  });
};
exports.edit = async (req, res) => {
  const song = await Song.findById(req.params.id);
  res.render("songs/edit", {
    title: `Edit ${song.title}`,
    song
  });
};
exports.update = async (req, res) => {
  const song = await Song.findOneAndUpdate(
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
  req.flash("success", `${song.title} was updated!`);
  res.redirect(`/songs/${song._id}`);
};
exports.deleteConfirm = async (req, res) => {
  const song = await Song.findById(req.params.id);
  res.render("songs/delete", {
    title: `Delete ${song.title}`,
    song
  });
};
exports.delete = async (req, res) => {
  const song = await Song.findByIdAndDelete(req.params.id);
  req.flash("success", `${song.title} was deleted`);
  res.redirect("/songs");
};
