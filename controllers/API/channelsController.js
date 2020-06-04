const channels = require("../../models/channels");

exports.active = async (req, res) => {
  const activeChannels = await channels.find({
    active: true
  });
  return res.json(activeChannels);
};

exports.all = async (req, res) => {
  const allChannels = await channels.find({});
  return res.json(allChannels);
};

exports.store = async (req, res) => {
  var channel = channels(req.body);
  channel.save((error, channel) => {
    return error ? res.status(501).json({ error }) : res.json(channel);
  });
};
