const mongoose = require('mongoose');

const Foes = mongoose.model('foes');
const config = require('../../config.js');

const foes_cache = {
  data: null,
  last_refresh: 0,
  async force_reload(res) {
    const that = this;
    const foes = await Foes.find();
    that.data = foes;
    that.last_refresh = Date.now();
    res.send(that.data);
  },
  async send_data(res) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      await this.force_reload(res);
    } else {
      res.send(this.data);
    }
  },
};

exports.index = async (req, res) => {
  await foes_cache.send_data(res);
};

exports.show = async (req, res) => {
  const foe = await Foes.findById(req.params.id);
  return res.json(foe);
};
