const mongoose = require('mongoose');

const Songbook = mongoose.model('songbook');
const Song = mongoose.model('song');
const { upload } = require('../handlers/imageUploader');
const { removeFromCloudinary } = require('../handlers/cloudinaryDelete');

exports.index = async (req, res) => {
  const songbooks = await Songbook.find({});
  return res.render('songbooks/index', {
    title: 'All Songbooks',
    songbooks,
  });
};

exports.create = async (req, res) => {
  const songs = await Song.find();

  return res.render('songbooks/create', {
    title: 'Create Songbook',
    songs,
  });
};

exports.store = async (req, res) => {
  const songbook = new Songbook(req.body);
  await songbook.save();
  req.flash('success', `${songbook.songbook_title} was created`);
  res.redirect(`/songbooks/${songbook.id}`);
};

exports.show = async (req, res) => {
  const songbook = await Songbook.findById(req.params.id);
  res.render('songbooks/show', {
    title: `${songbook.songbook_title}`,
    songbook,
  });
};
exports.edit = async (req, res) => {
  const songbook = await Songbook.findById(req.params.id);
  res.render('songbooks/edit', {
    title: `Edit ${songbook.songbook_title}`,
    songbook,
  });
};
exports.update = async (req, res) => {
	const chapters = [];
	if (req.body.chapter) {
		chapters = req.body.chapters.map((chapter) => JSON.parse(chapter));
	}
	if (!req.body.front_cover) {
		req.body.front_cover = '';
	}
	if (!req.body.back_cover) {
		req.body.back_cover = '';
	}
  req.body.chapters = chapters;
  const songbook = await Songbook.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    },
    {
      new: true,
      runValidators: true,
      context: 'query',
    },
  );
  req.flash('success', `${songbook.songbook_title} was updated!`);
  res.redirect(`/songbooks/${songbook.id}`);
};

exports.deleteConfirm = async (req, res) => {
  const songbook = await Songbook.findById(req.params.id);
  res.render('songbooks/delete', {
    title: `Delete ${songbook.songbook_title}`,
    songbook,
  });
};

exports.delete = async (req, res) => {
  const songbook = await Songbook.findByIdAndDelete(req.params.id);
  req.flash('success', `${songbook.songbook_title} was deleted!`);
  res.redirect('/songbooks');
};

exports.addChapter = async (req, res) => {
  const songbook = await Songbook.findById(req.params.id);
  res.render('songbooks/addChapter', {
    title: `Add Chapter to ${songbook.songbook_title}`,
    songbook,
  });
};

exports.saveChapter = async (req, res) => {
  const newChapter = {
    chapter_title: req.body.chapter_title,
    songs: [],
  };
  const songbook = await Songbook.findById(req.params.id);
  songbook.chapters.push(newChapter);
  await songbook.save();
  req.flash(
    'success',
    `${newChapter.chapter_title} was added to ${songbook.songbook_title}`,
  );
  res.redirect(`/songbooks/${songbook.id}`);
};

exports.deleteChapterConfirm = async (req, res) => {
  const songbook = await Songbook.findById(req.params.songbookId);
  const chapter = await songbook.chapters.id(req.params.chapterId);
  res.render('songbooks/deleteChapter', {
    title: `Delete ${chapter.chapter_title} Confirm`,
    songbook,
    chapter,
  });
};

exports.deleteChapter = async (req, res) => {
  const songbook = await Songbook.findById(req.params.songbookId);
  const chapter = await songbook.chapters.id(req.params.id);
  songbook.chapters.remove(chapter.chapter_title);
  await songbook.save();
  req.flash(
    'success',
    `${chapter.chapter_title} was removed from ${songbook.songbook_title}`,
  );
  res.redirect(`/songbooks/${songbook._id}`);
};

exports.removeChapterConfirm = async (req, res) => {
  res.send('Implement DELETE Confirm');
};
exports.removeChapter = async (req, res) => {
  res.send('Implement delete/remove chapter');
};

// Covers functions

exports.frontCoverUpload = async (req, res) => {
  const frontCover = await upload(req, {
    folder: 'songbooks/front-covers',
    format: 'jpg'
  });
  return res.json({
    url: frontCover[0].url,
    id: frontCover[0].public_id
  });
};

exports.backCoverUpload = async (req, res) => {
  const backCover = await upload(req, {
    folder: 'songbooks/back-covers',
    format: 'jpg'
  });
  return res.json({
    url: backCover[0].url,
    id: backCover[0].public_id
  });
};

exports.getCovers = async (req, res) => {
  const {
    songbookId,
    type
  } = req.query;
  if (!songbookId.length) {
    return res.send('Please provide an id');
  }
  if (!type) {
    return res.send('Please provide the image field you are looking for');
  }
  const songbook = await Songbook.findById(songbookId);
  res.json({
    name: songbook.songbook_title,
    [type]: songbook[type]
  });
};

exports.removeCover = async (req, res) => {
  const {
    songbookId,
    type
  } = req.query;
  if (!songbookId) {
    return res.send('Please provide an id');
  }
  if (!type) {
    return res.send('Please provide the image field you are looking for');
  }
  const songbook = await Songbook.findById(songbookId);
  let img;
  img = songbook[type];
  const response = await removeFromCloudinary(`songbooks/${type.toLowerCase()}`, img);
  res.send(response);
};
