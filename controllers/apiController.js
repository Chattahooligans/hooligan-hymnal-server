var Songs = require('../models/hymnModel');
var bodyParser = require('body-parser');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  app.get('/', function(req, res) {
    res.send('Chattahooligans API');
  });

  // returns all songs
  app.get('/api/songs', function(req, res) {
    Songs.find(function(err, songs) {
      if (err) throw err;
      console.log('all songs get');
      res.send(songs);
    });
  });

  // returns single song by id
  app.get('/api/song', function(req, res) {
    Songs.findById(
      {
        id: req.params.id
      },
      function(err, song) {
        if (err) throw err;
        console.log('id get');
        res.send(song);
      }
    );
  });

  // updates or creates song
  app.post('/api/song', function(req, res) {
    if (req.params.id) {
      Songs.findByIdAndUpdate(req.params.id, req.body, function(err, song) {
        if (err) throw err;
        console.log('song post');

        res.send('Successful create');
      });
    } else {
      var newSong = Songs(req.body);
      newSong.save(function(err) {
        if (err) throw err;
        res.send('Successful update');
      });
    }
  });

  app.delete('/api/song', function(req, res) {
    Songs.findByIdAndRemove(req.params.id, function(err) {
      if (err) throw err;
      res.send('Successful delete');
    });
  });
};
