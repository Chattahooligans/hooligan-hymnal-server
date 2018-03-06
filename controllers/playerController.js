var Players = require('../models/players');
var bodyParser = require('body-parser');

module.exports = app => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  // returns all players
  app.get('/api/players', (req, res) => {
    Players.find((error, players) => {
      if (error) {
        res.status(501).send({ error });
      }
      res.send(players);
    });
  });

  // returns single player by _id
  app.get('/api/player/:id', (req, res) => {
    Players.findById(req.params.id, (error, player) => {
      res.send(song);
    });
  });

  // creates player
  app.post('/api/player', (req, res) => {
    var newPlayer = Players(req.body);
    newPlayer.save((error, player) => {
      error ? res.status(501).send({ error }) : res.send(player);
    });
  });

  // updates player
  app.put('/api/player/:id', (req, res) => {
    Players.findByIdAndUpdate(req.params.id, req.body, (error, player) => {
      error ? res.status(501).send({ error }) : res.send(player);
    });
  });

  //deletes player
  app.delete('/api/player/:id', (req, res) => {
    Players.findByIdAndRemove(req.params.id, error => {
      error
        ? res.status(501).send({ error })
        : res.send({ message: 'Deleted' + req.params.id });
    });
  });
};
