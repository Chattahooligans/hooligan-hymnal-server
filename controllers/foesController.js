const mongoose = require('mongoose');
const csv = require('csv-parser')
const fs = require('fs')
const xlsx = require('xlsx')

const Foe = mongoose.model('foes');
const { removeFromCloudinary } = require('../handlers/cloudinaryDelete');
const { upload } = require('../handlers/imageUploader');
const { deleteCache } = require('../middleware/cacheMiddleware');

const DELETE_FOES_CACHE = () => deleteCache('foes');

exports.index = async (req, res) => {
  const { all } = req.query;
  let foes = await Foe.find({});
  let title = 'All Foes';
  if (!all) {
    foes = foes.filter((foe) => (foe.active ? foe : null));
    title = 'All Active Foes';
  }
  console.log(all);
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
 * TODO: Implement mass upload for xlsx
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.massFoesUpload = async (req, res) => {
  const file = req.files.foesCSV
  let data = []
  const xlsxFile = xlsx.readFile(file.tempFilePath)
  const sheets = xlsxFile.SheetNames

  console.log(sheets)
}

exports.store = async (req, res) => {
  const players = [];
  if (req.body.players) {
    req.body.players.map((player) => {
      players.push(JSON.parse(player));
    });
    req.body.players = players;
  } else {
    req.body.players = players;
  }
  if (req.body.active) {
    req.body.active = true;
  }
  const foe = await (new Foe(req.body)).save();
  DELETE_FOES_CACHE();
  req.flash('success', `Foe ${foe.opponent} was created`);
  res.redirect('/foes');
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.massUpload = async (req, res) => {
  if (!req.files) {
    req.flash('error', 'Please upload a file')
    return res.redirect(`/foes/${req.params.id}`)
  }
  const file = req.files.foeCSV
  if (file.mimetype !== 'text/csv') {
    req.flash('error', 'Please upload a CSV file')
    return res.redirect(`/foes/${req.params.id}`)
  }
  const foesPlayers = []
  fs.createReadStream(file.tempFilePath)
    .pipe(csv())
    .on('data', (data) => {
      if (data.Name !== '') {
        foesPlayers.push({
          name: data.Name,
          position: data.Position,
          number: data.Number
        })
      }
    })
    .on('end', async () => {
      await Foe.findOneAndUpdate({
        _id: req.params.id
      }, {
        $set: {
          players: []
        }
      }, {
          new: true,
          runValidators: true,
          context: 'query',
      })
      const foe = await Foe.findOneAndUpdate({
        _id: req.params.id
      }, {
        $set: {
          players: foesPlayers
        }
      }, {
          new: true,
          runValidators: true,
          context: 'query',
      })
      DELETE_FOES_CACHE();
      req.flash('success', `${foe.opponent} Player's Mass Updated!`)
      return res.redirect(`/foes/${req.params.id}/edit`)
    }).on('error', () => {
      req.flash('error', 'Error uploading players')
      return res.redirect(`/foes/${req.params.id}/edit`)
    })
}

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

exports.update = async (req, res) => {
  const players = [];
  if (req.body.players) {
    req.body.players.map((player) => players.push(JSON.parse(player)));
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
  const foe = await Foe.findOneAndUpdate(
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
