var Songs = require('../models/songs');
var Notifications = require('../models/notifications');
var bodyParser = require('body-parser');
var config = require("../config.js");

var song_cache = {
  data: null,
  last_refresh: 0,
  force_reload: function(res) {
    var that = this;
    Songs.find((error, songs) => {
      if (error) {
        that.data = {};
      }
      that.data = songs;
      that.last_refresh = Date.now();
      if(res != null) res.send(that.data);
    });
  },
  send_data: function(res) {
    if(this.last_refresh + config.cache_timeout < Date.now()) {
      console.log("forcing reload");
      this.force_reload(res);
    } else {
      console.log("sending from cache");
      res.send(this.data);
    }
  }
}

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
    song_cache.send_data(res);
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
    song_cache.force_reload();
  });

  // updates song
  app.put('/api/song/:id', (req, res) => {
    Songs.findByIdAndUpdate(req.params.id, req.body, (error, song) => {
      error ? res.status(501).send({ error }) : res.send(song);
    });
    song_cache.force_reload();
  });

  // deletes song
  app.delete('/api/song/:id', (req, res) => {
    Songs.findByIdAndRemove(req.params.id, error => {
      error
        ? res.status(501).send({ error })
        : res.send({ message: 'Deleted' + req.params.id });
    });
    song_cache.force_reload();
  });
};
