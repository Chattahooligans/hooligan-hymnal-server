const mongoose = require("mongoose");
const Songbook = mongoose.model("songbook");
const Song = mongoose.model("song");

exports.songbookChapter = async (req, res) => {
  const songsPromise = Song.find();
  const SongbookPromise = Songbook.findById(req.params.songbookId);
  const [songs, songbook] = await Promise.all([songsPromise, SongbookPromise]);
  const chapter = await songbook.chapters.id(req.params.chapterId);
  res.render("songbookSongs/index", {
    title: `Add Songs to ${songbook.songbook_title}: Chapter: ${chapter.chapter_title}`,
    songs,
    songbook,
    chapter
  });
};

exports.addSongToChapterForm = async (req, res) => {
  const songPromise = Song.findById(req.params.songId);
  const songbookPromise = Songbook.findById(req.params.songbookId);
  const [song, songbook] = await Promise.all([songPromise, songbookPromise]);
  const chapter = await songbook.chapters.id(req.params.chapterId);
  res.render("songbookSongs/create", {
    title: `Add ${song.title} to ${chapter.chapter_title}`,
    song,
    songbook,
    chapter
  });
};

exports.saveSongToChapter = async (req, res) => {
  const songbook = await Songbook.findById(req.params.songbookId);
  const chapter = await songbook.chapters.id(req.params.chapterId);
  let featured = false;
  if (req.body.featured == "on") {
    featured = true;
  }
  const newSong = {
    _id: req.params.songId,
    hint: req.body.hint,
    featured
  };
  chapter.songs.push(newSong);
  await songbook.save();
  req.flash(
    "success",
    `${req.body.hint} was added to ${chapter.chapter_title}`
  );
  res.redirect(`/songbooks/${songbook._id}`);
};

exports.showSongbookChapter = async (req, res) => {
  const songbook = await Songbook.findById(req.params.songbookId);
  const chapter = await songbook.chapters.id(req.params.chapterId);
  res.render("songbookSongs/show", {
    title: `${chapter.chapter_title} Songs`,
    songbook,
    chapter
  });
};

exports.removeSongFromChapterConfirm = async (req, res) => {
  const songPromise = Song.findById(req.params.songId);
  const songbookPromise = Songbook.findById(req.params.songbookId);
  const [song, songbook] = await Promise.all([songPromise, songbookPromise]);
  const chapter = await songbook.chapters.id(req.params.chapterId);
  await chapter.songs.remove(req.params.songId);
  await songbook.save();
  req.flash(
    "success",
    `${song.title} was successfully deleted from ${chapter.chapter_title}`
  );
  res.redirect(`/songbooks/${songbook._id}/chapters/${chapter._id}/songs`);
};

exports.removeSongFromChapter = async (req, res) => {};
