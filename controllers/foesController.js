const mongoose = require('mongoose');
const csv = require('csv-parser')
const fs = require('fs')
const xlsx = require('xlsx')

const Foe = mongoose.model('foes');
const { removeFromCloudinary } = require('../handlers/cloudinaryDelete');
const { upload } = require('../handlers/imageUploader');
const { deleteCache } = require('../middleware/cacheMiddleware');

const DELETE_FOES_CACHE = () => deleteCache('foes');


/**
 *
 * @param {"GK" | "G" | "M" | "F" | "D" | "S"} position
 * @returns {String}
 */
function getPosition(position) {
  if (position && position.length === 0) return ''
  switch (position.split(',')[0].toUpperCase()) {
    case 'GK':
    case 'G':
      return 'Goalkeeper'
    case 'M':
      return 'Midfielder'
    case 'D':
      return 'Defender'
    case 'S':
    case 'F':
      return 'Forward'
    default:
      return position
  }
}
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
 async function foesCsvParser(req, res, foe) {
  const players = []
  if (req.files && req.files.foeCSV) {
    const file = req.files.foeCSV
    if (['application/vnd.ms-excel','text/plain','text/csv','text/tsv', 'application/octet-stream'].indexOf(file.mimetype) === -1) {
      req.flash('error', 'Please upload a CSV file')
      res.redirect((typeof foe !== 'undefined') ? `/foes/${foe.id}` : `/foes/create`)
      return players
    }
    const parser = fs.createReadStream(file.tempFilePath).pipe(csv())
    for await (const record of parser) {
      if (record.Name !== '') {
        players.push({
          name: record.Name,
          position: getPosition(record.Position),
          squadNumber: record.Number
        })
      }
    }
  }
  return players
}

exports.index = async (req, res) => {
  const { all } = req.query;
  let foes = await Foe.find({});
  let title = 'All Foes';
  if (!all) {
    foes = foes.filter((foe) => (foe.active ? foe : null));
    title = 'All Active Foes';
  }
  res.render('foes/index', {
    title,
    foes,
    all,
  });
};

exports.create = (req, res) => {
  res.render('foes/create', {
    title: 'Create Foe',
  });
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.store = async (req, res) => {
  let players = [];
  players = await foesCsvParser(req, res)
  if (req.body['players[]']) {
    req.body['players[]'].map((player) => {
      players.push(JSON.parse(player));
    });
    req.body.players = players;
  } else {
    req.body.players = players
  }
  if (req.body.active) {
    req.body.active = true;
  }
  const foe = await (new Foe(req.body)).save();
  DELETE_FOES_CACHE();
  req.flash('success', `Foe ${foe.opponent} was created`);
  res.redirect('/foes');
};

exports.show = async (req, res) => {
  const foe = await Foe.findById(req.params.id);
  res.render('foes/show', {
    title: `${foe.opponent}`,
    foe,
  });
};

exports.edit = async (req, res) => {
  const foe = await Foe.findById(req.params.id);
  res.render('foes/edit', {
    title: `Edit ${foe.opponent}`,
    foe,
  });
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.update = async (req, res) => {
  let players = [];
  let foe = await Foe.findById(req.params.id)
  players = await foesCsvParser(req, res, foe)
  if (req.body['players[]']) {
    req.body['players[]'].map((player) => players.push(JSON.parse(player)));
    req.body.players = players;
  } else {
    req.body.players = players;
  }

  if (!req.body.logo) {
    req.body.logo = '';
  }
  if (!req.body.active) {
    req.body.active = false;
  } else {
    req.body.active = true;
  }
  foe = await Foe.findOneAndUpdate(
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
  DELETE_FOES_CACHE();
  req.flash('success', `${foe.opponent} was updated!`);
  res.redirect(`/foes/${foe.id}`);
};

exports.deleteConfirm = async (req, res) => {
  const foe = await Foe.findById(req.params.id);
  res.render('foes/delete', {
    title: `Delete ${foe.opponent}`,
    foe,
  });
};

exports.delete = async (req, res) => {
  const foe = await Foe.findById(req.params.id);
  await foe.remove();
  DELETE_FOES_CACHE();
  req.flash('success', `${foe.opponent} was deleted!`);
  res.redirect('/foes');
};

exports.logo = async (req, res) => {
  const image = await upload(req, {
    folder: 'foes_logo',
    format: 'png',
  });
  res.json({
    url: image[0].url,
    id: image[0].public_id,
  });
};

exports.getLogo = async (req, res) => {
  const {
    foeId,
    type,
  } = req.query;
  if (!foeId.length) {
    return res.send('Please provide an id');
  }
  if (!type) {
    return res.send('Please provide the image field you are looking for');
  }
  const foe = await Foe.findById(foeId);
  res.send({
    name: foe.opponent,
    [type]: foe[type],
  });
};

exports.removeLogo = async (req, res) => {
  const {
    foeId,
    type,
  } = req.query;
  if (!foeId) {
    return res.send('Please provide a id');
  }
  if (!type) {
    return res.send('Please provide the image field you are looking for');
  }
  const foe = await Foe.findById(foeId);
  const img = foe[type];
  const response = await removeFromCloudinary(`foes_${type.toLowerCase()}`, img);
  // eslint-disable-next-line
  return res.send(response);
};
