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
  const channel = await Channel.findById(req.params.id);
  return res.render('channels/edit', {
    title: `Edit ${channel.name}`,
    channel,
  });
};

exports.update = async (req, res) => res.send(req.body);

exports.deleteConfirm = async (req, res) => {
  const channel = await Channel.findById(req.params.id);
  return res.render('channels/delete', {
    title: `Delete ${channel.name}`,
    channel,
  });
};

exports.delete = async (req, res) => {};
