var Hymns = require('../models/hymnModel');
var bodyParser = require('body-parser');

module.exports = function (app) {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // returns all hymns
  app.get('/api/hymns', function (req, res) {

    Hymns.find(function (err, hymns) {
      if (err) throw err;
      console.log('all hymns get');
      res.send(hymns);
    });

  });

  // returns single hymn by id
  app.get('/api/hymn/:id', function (req, res) {

    Hymns.findById({
      _id: req.params.id
    }, function (err, hymn) {
      if (err) throw err;
      console.log('id get');
      res.send(hymn);
    });

  });

  // updates or creates hymn
  app.post('/api/hymn', function (req, res) {

    if (req.params.id) {
      Hymns.findByIdAndUpdate(req.params.id, {
        title: req.params.title,
        id: req.params.id,
        lyrics: req.params.lyrics
      }, function (err, hymn) {
        if (err) throw err;
        console.log('hymn post');

        res.send('Successful create');
      });
    } else {

      var newHymn = Hymns({
        title: req.params.title,
        id: req.params.id,
        lyrics: req.params.lyrics
      });
      newHymn.save(function (err) {
        if (err) throw err;
        res.send('Successful update');
      });

    }

  });

  app.delete('/api/hymn', function (req, res) {

    Hymns.findByIdAndRemove(req.params.id, function (err) {
      if (err) throw err;
      res.send('Successful delete');
    });

  });

};