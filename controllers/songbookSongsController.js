const mongoose = require('mongoose');

const Songbook = mongoose.model('songbook');
const Song = mongoose.model('song');

exports.songbookChapter = async (req, res) => {
  const songbook = await Songbook.findById(req.params.songbookId);
  const chapter = await songbook.chapters.id(req.params.chapterId);
  res.render('songbookSongs/index', {
    title: `${songbook.songbook_title} | Chapter: ${chapter.chapter_title}`,
    songbook,
    chapter,
  });
};

exports.addSongsToChapterForm = async (req, res) => {
  const songsPromise = Song.find({});
  const songbookPromise = Songbook.findById(req.params.songbookId);
  const [songs, songbook] = await Promise.all([songsPromise, songbookPromise]);
  const chapter = await songbook.chapters.id(req.params.chapterId);

  res.render('songbookSongs/create', {
    title: `Add songs to ${chapter.chapter_title}`,
    songs,
    songbook,
    chapter,
  });
};


/**
 * @param {Request} req
 * @param {Response} res
 */
exports.addSongsToChapter = async (req, res) => {
  const songbook = await Songbook.findById(req.params.songbookId);
  const chapter = await songbook.chapters.id(req.params.chapterId);

  if (req.body.songs) {
    req.body.songs = req.body.songs.map((song) =>  JSON.parse(song))
    chapter.songs = req.body.songs
    await songbook.save();
  }
  req.flash('success', `Songs added to ${chapter.chapter_title}`);
  return res.redirect(`/songbooks/${songbook.id}/chapters/${chapter.id}`);
};
