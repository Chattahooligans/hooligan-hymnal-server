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

exports.editSongInChapter = async (req, res) => {
  const songbook = await Songbook.findById(req.params.songbookId);
  const chapter = await songbook.chapters.id(req.params.chapterId);
  const song = await chapter.songs.id(req.params.songId);
  res.render("songbookSongs/edit", {
    title: `Edit ${song.hint} in ${chapter.chapter_title}`,
    song
  });
};

exports.updateSongInChapter = async (req, res) => {
  const songbook = await Songbook.findById(req.params.songbookId);
  const chapter = await songbook.chapters.id(req.params.chapterId);
  let song = await chapter.songs.id(req.params.songId);
  song.hint = req.body.hint;
  song.featured = req.body.featured == "on" ? true : false;
  await songbook.save();
  req.flash("success", `${song.hint} was Updated`);
  res.redirect(`/songbooks/${songbook.id}`);
};

exports.removeSongFromChapterConfirm = async (req, res) => {
  const songbook = await Songbook.findById(req.params.songbookId);
  const chapter = await songbook.chapters.id(req.params.chapterId);
  const song = await chapter.songs.id(req.params.songId);
  res.render("songbookSongs/delete", {
    title: `Remove ${song.hint} from ${chapter.chapter_title}`,
    songbook,
    chapter,
    song
  });
};

exports.removeSongFromChapter = async (req, res) => {
  const songbook = await Songbook.findById(req.params.songbookId);
  const chapter = await songbook.chapters.id(req.params.chapterId);
  const song = await chapter.songs.id(req.params.songId);
  await chapter.songs.remove(song._id);
  await songbook.save();
  req.flash(
    "success",
    `${song.hint} was successfully deleted from ${chapter.chapter_title}`
  );
  res.redirect(`/songbooks/${songbook._id}/chapters/${chapter._id}/songs`);
};
