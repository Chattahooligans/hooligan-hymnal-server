const mongoose = require("mongoose");
const Songbook = mongoose.model("songbook");
const Song = mongoose.model("song");

exports.allSongs = async (req, res) => {
  const songs = Song.find({});
  const songbook = Songbook.findById(req.params.songbookId);
  await Promise.all([songs, songbook]);
  res.render("songbookSongs/index", {
    title: `Select Song to Add To ${songbook.title}`,
    songs,
    songbook
  });
};
