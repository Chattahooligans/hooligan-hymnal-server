const mongoose = require("mongoose");
const Songbook = mongoose.model("songbook");
const Song = mongoose.model("song");

exports.allSongs = async (req, res) => {
  const songs = Song.find({});
  const songbook = Songbook.findById(req.params.songbookId);
  await Promise.all([songs, songbook]);
  res.render("songbookSongs/index", {
    title: `Select Song to Add To ${songbook.songbook_title}`,
    songs,
    songbook
  });
};

exports.addSong = async (req, res) => {
  const song = Song.findById(req.params.songId);
  const songbook = Songbook.findById(req.params.songbookId);
  await Promise.all([song, songbook]);
  res.render("songbookSongs/create", {
    title: `Add ${song.title} to ${songbook.songbook_title}`,
    song,
    songbook
  });
};

exports.saveSong = async (req, res) => {
  const song = Song.findById(req.params.songId);
  const songbook = Songbook.findById(req.params.songbookId);
  await Promise.all([song, songbook]);
  res.send({
    body: req.body,
    song,
    songbook
  });
};

exports.removeSong = async (req, res) => {
  const songbook = await Songbook.findById(req.params.songbookId);
  const songId = req.params.songId;
  res.send({
    songbook,
    songId
  });
};
