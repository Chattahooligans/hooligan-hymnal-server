require('dotenv').config();
const mongoose = require('mongoose');

const Player = mongoose.model('players');
const {
  removeFromCloudinary,
} = require('../handlers/cloudinaryDelete');
const { upload } = require('../handlers/imageUploader');

exports.index = async (req, res) => {
  const page = req.query.page || 1;
  const limit = 10;
  const skip = (page * limit) - limit;
  const name = req.query.name || '';

  const playersPromise = Player
    .find({
      name: {
        $regex: `.*${name}.*`,
        $options: 'i',
      },
    })
    .skip(skip)
    .limit(limit)
    .sort({ name: 'asc' });

  const countPromise = Player.count();
  const searchCountPromise = Player.find({
    name: {
      $regex: `.*${name}.*`,
      $options: 'i',
    },
  }).count();
  const [players, totalCount, searchCount] = await Promise.all([playersPromise, countPromise, searchCountPromise]);
  const pages = Math.ceil((searchCount || totalCount) / limit);
  if (!players.length && skip) {
    req.flash('error', `Hey! You asked for page ${page}. But that doesn't exist. So I put you on page ${pages}`);
    res.redirect(`/players?page=${pages}`);
  }

  res.render('players/index', {
    title: 'All Players',
    players,
    totalCount,
    searchCount,
    skip,
    page,
    pages,
    name,
  });
};

exports.search = async (req, res) => {
  const name = req.query.name || '';
  const page = req.query.page || 1;
  const limit = 10;
  const skip = (page * limit) - limit;

  const playersPromise = Player
    .find({
      name: {
        $regex: `.*${name}.*`,
        $options: 'i',
      },
    })
    .skip(skip)
    .limit(limit)
    .sort({ name: 'asc' });
  const totalCountPromise = Player.count();
  const searchCountPromise = Player.find({
    name: {
      $regex: `.*${name}.*`,
      $options: 'i',
    },
  }).count();
  const [players, totalCount, searchCount] = await Promise.all([playersPromise, totalCountPromise, searchCountPromise]);
  const pages = Math.ceil(searchCount / limit);

  res.render('players/_playersList', {
    players,
    name,
    skip,
    page,
    pages,
    totalCount,
    searchCount,
  });
};

exports.create = (req, res) => {
  res.render('players/create', {
    title: 'Create Player',
  });
};

exports.store = async (req, res) => {
  const player = new Player(req.body);
  await player.save();
  req.flash('success', `${player.name} was successfully created!`);
  res.redirect('/players');
};

exports.show = async (req, res) => {
  const player = await Player.findById(req.params.id);
  res.render('players/show', {
    title: `${player.name}`,
    player,
  });
};

exports.edit = async (req, res) => {
  const player = await Player.findById(req.params.id);
  res.render('players/edit', {
    title: `Edit ${player.name}`,
    player,
  });
};

exports.update = async (req, res) => {
  if (!req.body.images) {
    req.body.images = [];
  }
  if (!req.body.thumbnail) {
    req.body.thumbnail = '';
  }
  const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  req.flash('success', `${player.name} was updated`);
  res.redirect(`/players/${player._id}`);
};

exports.deleteConfirm = async (req, res) => {
  const player = await Player.findById(req.params.id);
  res.render('players/delete', {
    title: `${player.name} Delete`,
    player,
  });
};

exports.delete = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    req.flash('error', 'Name not provided or names did not match');
    return res.redirect('back');
  }
  const player = await Player.findById(req.params.id);
  if (name !== player.name) {
    req.flash('error', "The name didn't match please try again.");
    return res.redirect('back');
  }
  await player.remove();
  req.flash('success', `${player.name} was deleted!`);
  res.redirect('/players');
};

exports.uploadImages = async (req, res) => {
  const images = await upload(req, {
    folder: 'players_images',
    format: 'jpg',
  });
  res.send({
    url: images[0].url,
    id: images[0].public_id,
  });
};

exports.uploadThumbnail = async (req, res) => {
  const image = await upload(req, {
    transformation: {
      width: 200,
      height: 200,
      crop: 'thumb',
      gravity: 'face',
    },
    folder: 'players_thumbnails',
    format: 'jpg',
  });
  res.json({
    url: image[0].url,
    id: image[0].public_id,
  });
};

exports.getImages = async (req, res) => {
  const {
    playerId,
    type,
  } = req.query;
  if (!playerId.length) {
    return res.send('Please provide a id');
  }
  if (!type) {
    return res.send('Please provide the image field you are looking for');
  }
  const player = await Player.findById(playerId);
  res.send({
    name: player.name,
    [type]: player[type],
  });
};

exports.removeImage = async (req, res) => {
  const {
    playerId,
    type,
  } = req.query;
  if (!playerId) {
    return res.send('Please provide a id');
  }
  if (!type) {
    return res.send('Please provide the image field you are looking for');
  }
  const player = await Player.findById(playerId);
  let img;
  if (Array.isArray(player[type])) {
    img = player[type].filter((img) => img === req.body.img)[0];
  } else {
    img = player[type];
  }
  const response = await removeFromCloudinary(`players_${type.toLowerCase()}`, img);
  res.send(response);
};
