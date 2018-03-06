var Songs = require('../models/songs');
var Notifications = require('../models/notifications');
var bodyParser = require('body-parser');

module.exports = app => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  // Return something for bare URL just so we can be sure the server is running
  app.get('/', (req, res) => {
    res.send('Chattahooligans API is running');
  });

  // returns all songs
  app.get('/api/songs', (req, res) => {
    Songs.find((error, songs) => {
      if (error) {
        res.status(501).send({ error });
      }
      res.send(songs);
    });
  });

  // returns single song by _id
  app.get('/api/song/:id', (req, res) => {
    Songs.findById(req.params.id, (error, song) => {
      res.send(song);
    });
  });

  // creates song
  app.post('/api/song', (req, res) => {
    var newSong = Songs(req.body);
    newSong.save((error, song) => {
      error ? res.status(501).send({ error }) : res.send(song);
    });
  });

  // updates song
  app.put('/api/song/:id', (req, res) => {
    Songs.findByIdAndUpdate(req.params.id, req.body, (error, song) => {
      error ? res.status(501).send({ error }) : res.send(song);
    });
  });

  // deletes song
  app.delete('/api/song/:id', (req, res) => {
    Songs.findByIdAndRemove(req.params.id, error => {
      error
        ? res.status(501).send({ error })
        : res.send({ message: 'Deleted' + req.params.id });
    });
  });
};
