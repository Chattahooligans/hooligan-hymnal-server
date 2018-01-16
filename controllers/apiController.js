var Hymns = require('../models/hymnModel');
var bodyParser = require('body-parser');

module.exports = function (app) {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.get('/api/Hymns', function (req, res) {

    Hymns.find({
        username: req.params.uname
      }, function (err, hymn) {
        if (err) 
          throw err;
        console.log('all Hymns get');
        res.send(hymn);
      });

  });

  app.get('/api/hymn/:title', function (req, res) {

    Hymns.findById({
        _title: req.params.title
      }, function (err, hymn) {
        if (err) 
          throw err;
        console.log('title get');
        res.send(hymn);
      });

  });

  app.post('/api/hymn', function (req, res) {

    if (req.body.id) {
      Hymns
        .findByIdAndUpdate(req.body.id, {
          hymn: req.body.hymn,
          isDone: req.body.isDone,
          hasAttachment: req.body.hasAttachment
        }, function (err, hymn) {
          if (err) 
            throw err;
          console.log('hymn post');

          res.send('Success');
        });
    } else {

      var newHymn = Hymns({title: 'test', lyrics: req.body.hymn.lyrics});
      newHymn.save(function (err) {
        if (err) 
          throw err;
        res.send('Success');
      });

    }

  });

  app.delete('/api/hymn/delete/:title', function (req, res) {

    Hymns
      .findByIdAndRemove(req.body.id, function (err) {
        if (err) 
          throw err;
        res.send('Success');
      });

  });

};