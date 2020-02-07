const mongoose = require('mongoose');

const Channel = mongoose.model('channels');
const User = mongoose.model('User');

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
  // res.send(req.body);
};

exports.deleteConfirm = async (req, res) => {
  const channel = await Channel.findById(req.params.id);
  return res.render('channels/delete', {
    title: `Delete ${channel.name}`,
    channel,
  });
};

exports.delete = async (req, res) => {};
