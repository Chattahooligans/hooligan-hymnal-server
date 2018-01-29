var Songs = require('../models/songModel');
var bodyParser = require('body-parser');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  // Return something for bare URL just so we can be sure the server is running
  app.get('/', function(req, res) {
    res.send('Chattahooligans API is running');
  });

  // returns all songs
  app.get('/api/songs', function(req, res) {
    Songs.find(function(err, songs) {
      if (err) {
        console.error(err);
      }
      res.send(songs);
    });
  });

  // returns single song by guid
  app.get('/api/song/:guid', function(req, res) {
    Songs.findOne({ guid: req.params.guid }, 'guid title lyrics').then(song => {
      res.send(song);
    });
  });

  // creates song
  app.post('/api/song', function(req, res) {
    var newSong = Songs(req.body);
    newSong.save(function(err) {
      if (err) {
        console.error(err);
      }
      res.send('Successful create');
    });
  });

  // updates song
  app.put('/api/song/:guid', function(req, res) {
    Songs.findOneAndUpdate({ guid: req.params.guid }, req.body, function(
      err,
      song
    ) {
      console.log('song post');
      if (err) {
        console.error(err);
      }
      res.send('Successful update');
    });
  });

  app.delete('/api/song/:guid', function(req, res) {
    Songs.findOneAndRemove({ guid: req.params.guid }, function(err) {
      if (err) {
        console.error(err);
      }
      res.send('Successful delete');
    });
  });
};
