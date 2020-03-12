const mongoose = require('mongoose');

const Channel = mongoose.model('channels');
const User = mongoose.model('User');
const { removeFromCloudinary } = require('../handlers/cloudinaryDelete');
const { upload } = require('../handlers/imageUploader');

exports.index = async (req, res) => {
  const channels = await Channel.find();
  return res.render('channels/index', {
    title: 'All Channels',
    channels,
  });
};

exports.create = async (req, res) => {
  let users = await User.find().select('id email name familyName feedAllowed');
  users = users.filter((user) => user.feedAllowed === true);
  res.render('channels/create', {
    title: 'Create Channel',
    users,
  });
};

exports.store = async (req, res) => {
  const users = [];
  if (req.body.users) {
    req.body.users.forEach((user) => users.push(JSON.parse(user)));
    req.body.users = users;
  }
  if (req.body.follow) {
    req.body.follow = true;
  }
  if (req.body.active) {
    req.body.active = true;
  }
  const channel = new Channel(req.body);
  await channel.save();
  req.flash('success', `${channel.name} aws created!`);
  return res.redirect('/channels');
};

exports.show = async (req, res) => {
  const channel = await Channel.findById(req.params.id);
  return res.render('channels/show', {
    title: `${channel.name}`,
    channel,
  });
};

exports.edit = async (req, res) => {
  const channelPromise = Channel.findById(req.params.id);
  const userPromise = User.find();
  let [channel, users] = await Promise.all([channelPromise, userPromise]);

  users = users.filter((user) => user.feedAllowed === true);
  return res.render('channels/edit', {
    title: `Edit ${channel.name}`,
    channel,
    users,
  });
};

exports.update = async (req, res) => {
  const users = [];
  if (req.body.users) {
    req.body.users.forEach((user) => users.push(JSON.parse(user)));
    req.body.users = users;
  }
  if (req.body.follow) {
    req.body.follow = true;
  }
  if (req.body.active) {
    req.body.active = true;
  }
  const channel = await Channel.findById(req.params.id);
  await channel.update(req.body);
  return res.redirect(`/channels/${channel._id}`);
};

exports.deleteConfirm = async (req, res) => {
  const channel = await Channel.findById(req.params.id);
  return res.render('channels/delete', {
    title: `Delete ${channel.name}`,
    channel,
  });
};

exports.delete = async (req, res) => {
  const channel = await Channel.findById(req.params.id);
  if (!req.body.name) {
    req.flash('error', 'Please provide a valid name for the channel');
    return res.redirect('back');
  }
  if (req.body.name !== channel.name) {
    req.flash('error', 'The name did not match. Please try again');
    return res.redirect('back');
  }
  await channel.remove();
  req.flash('success', `${channel.name} was deleted`);
  return res.redirect('/channels');
};

exports.avatar = async (req, res) => {
  const avatar = await upload(req, {
    folder: 'channels',
    format: 'png',
  });
  return res.json({
    url: avatar[0].url,
    id: avatar[0].public_id,
  });
};

exports.getAvatars = async (req, res) => {
  const {
    channelId,
    type,
  } = req.query;
  if (!channelId.length) {
    return res.send('Please provide and id');
  }
  if (!type) {
    return res.send('Please provide the image field you are looking for');
  }
  const channel = await Channel.findById(channelId);
  return res.send({
    name: channel.name,
    [type]: channel[type],
  });
};

exports.removeAvatar = async (req, res) => {
  const {
    channelId,
    type,
  } = req.query;
  if (!channelId.length) {
    return res.send('Please provide and id');
  }
  if (!type) {
    return res.send('Please provide the image field you are looking for');
  }
  const channel = await Channel.findById(channelId);
  const img = channel[type];
  const response = await removeFromCloudinary(`channels/${img}`);
  return res.send(response);
};
