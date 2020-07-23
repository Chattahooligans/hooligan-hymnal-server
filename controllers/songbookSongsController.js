const mongoose = require('mongoose');

const Songbook = mongoose.model('songbook');
const Song = mongoose.model('song');

const { deleteCache } = require('../middleware/cacheMiddleware');

exports.songbookChapter = async (req, res) => {
  const songbook = await Songbook.findById(req.params.songbookId);
  const chapter = await songbook.chapters.id(req.params.chapterId);
  res.render('songbookSongs/index', {
    title: `${songbook.songbookTitle} | Chapter: ${chapter.chapterTitle}`,
    songbook,
    chapter,
  });
};

exports.addSongsToChapterForm = async (req, res) => {
  const songsPromise = Song.find({}).sort('title');
  const songbookPromise = Songbook.findById(req.params.songbookId);
  const [songs, songbook] = await Promise.all([songsPromise, songbookPromise]);
  const chapter = await songbook.chapters.id(req.params.chapterId);

  res.render('songbookSongs/create', {
    title: `Add songs to ${chapter.chapterTitle}`,
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
    chapter.chapterTitle = req.body.chapterTitle;
    chapter.songs = req.body.songs
    await songbook.save();
    deleteCache('songbooks');
  }
  req.flash('success', `Songs added to ${chapter.chapterTitle}`);
  return res.redirect(`/songbooks/${songbook.id}/chapters/${chapter.id}`);
};
