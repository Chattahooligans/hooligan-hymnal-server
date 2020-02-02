const mongoose = require('mongoose');

const Song = mongoose.model('song');
const Player = mongoose.model('players');

exports.index = async (req, res) => {
  const page = req.query.page || 1;
  const limit = 10;
  const skip = (page * limit) - limit;
  const filter = req.query.filter || '';

  const SEARCH_QUERY = {
    $or: [
      {
        title: {
          $regex: `.*${filter}.*`,
          $options: 'i',
        },
      },
      {
        lyrics: {
          $regex: `.*${filter}.*`,
          $options: 'i',
        },
      },
      {
        referenceTitle: {
          $regex: `.*${filter}.*`,
          $options: 'i',
        },
      },
      {
        category: {
          $regex: `.*${filter}.*`,
          $options: 'i',
        },
      },
    ],
  };

  const songsPromise = Song
    .find(SEARCH_QUERY)
    .skip(skip)
    .limit(limit)
    .sort({ title: 'asc' });

  const countPromise = Song.count();
  const searchCountPromise = Song.find(SEARCH_QUERY).count();
  const [songs, totalCount, searchCount] = await Promise.all([songsPromise, countPromise, searchCountPromise]);
  const pages = Math.ceil((searchCount || totalCount) / limit);
  if (!songs.length && skip) {
    req.flash('error', `Hey! You asked for page ${page}. But that doesn't exist. So I put you on page ${pages}`);
    res.redirect(`/songs?page=${pages}`);
  }

  res.render('songs/index', {
    title: 'All Songs',
    songs,
    totalCount,
    searchCount,
    skip,
    page,
    pages,
    filter,
  });
};

exports.search = async (req, res) => {
  const filter = req.query.filter || '';
  const page = req.query.page || 1;
  const limit = 10;
  const skip = (page * limit) - limit;

  const SEARCH_QUERY = {
    $or: [
      {
        title: {
          $regex: `.*${filter}.*`,
          $options: 'i',
        },
      },
      {
        lyrics: {
          $regex: `.*${filter}.*`,
          $options: 'i',
        },
      },
      {
        referenceTitle: {
          $regex: `.*${filter}.*`,
          $options: 'i',
        },
      },
      {
        category: {
          $regex: `.*${filter}.*`,
          $options: 'i',
        },
      },
    ],
  };

  const songsPromise = Song
    .find(SEARCH_QUERY)
    .skip(skip)
    .limit(limit)
    .sort({
      title: 'asc',
    });

  const totalCountPromise = Song.countDocuments();
  const searchCountPromise = Song.find(SEARCH_QUERY).countDocuments();
  const [songs, totalCount, searchCount] = await Promise.all([songsPromise, totalCountPromise, searchCountPromise]);
  const pages = Math.ceil(searchCount / limit);

  res.render('songs/_songsList', {
    songs,
    filter,
    skip,
    page,
    pages,
    totalCount,
    searchCount,
  });
};

exports.create = async (req, res) => {
  const players = await Player.find({}).select('id name').sort('name');
  res.render('songs/create', {
    title: 'Create Song',
    players,
  });
};

exports.store = async (req, res) => {
  const song = await new Song(req.body).save();
  req.flash('success', `${song.title} was created!`);
  res.redirect('/songs');
};

exports.show = async (req, res) => {
  const { breadcrumbs } = req;
  const song = await Song.findById(req.params.id);
  let player = {};
  if (song.playerId) {
    player = await Player.findById(song.playerId);
  }
  res.render('songs/show', {
    title: `${song.title}`,
    song,
    player,
    breadcrumbs,
  });
};

exports.edit = async (req, res) => {
  const songPromise = Song.findById(req.params.id);
  const playersPromise = Player.find({}).select('id name').sort('name');
  const [song, players] = await Promise.all([songPromise, playersPromise]);
  res.render('songs/edit', {
    title: `Edit ${song.title}`,
    song,
    players,
  });
};

exports.update = async (req, res) => {
  const song = await Song.findOneAndUpdate(
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
  req.flash('success', `${song.title} was updated!`);
  res.redirect(`/songs/${song.id}`);
};

exports.deleteConfirm = async (req, res) => {
  const song = await Song.findById(req.params.id);
  res.render('songs/delete', {
    title: `Delete ${song.title}`,
    song,
  });
};

exports.delete = async (req, res) => {
  const song = await Song.findByIdAndDelete(req.params.id);
  req.flash('success', `${song.title} was deleted`);
  res.redirect('/songs');
};
