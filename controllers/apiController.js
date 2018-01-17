var Hymns = require('../models/hymnModel');
var bodyParser = require('body-parser');

var idGenerator = function () {
  //genereated ID for hymn
}

module.exports = function (app) {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  /* Returns all hymns*/
  app.get('/hymns', function (req, res) {

    Hymns.find(function (err, hymns) {
        if (err) 
          throw err;
        console.log('all hymns get');
        res.json(hymns);
      });

  });

  /* Returns single hymn by ID*/
  app.get('/hymn/:id', function (req, res) {

    Hymns.findById({
        _id: req.params.id
      }, function (err, hymn) {
        if (err) 
          throw err;
        console.log('id get');
        res.json(hymn);
      });

  });

  /* Creates or updates hymn */
  app.post('/hymn', function (req, res) {

    /* Updates existing hymn*/
    if (req.body.id) {
      Hymns
        .findByIdAndUpdate(req.body.id, {
          title: req.body.title,
          lyrics: req.body.lyrics,
          id: req.body.id
        }, function (err, hymn) {
          if (err) 
            throw err;
          console.log('hymn updated');
          res.json(hymn);
        });
    } else {

      /* Creates new hymn*/
      var newHymn = Hymns({title: req.body.title, id: idGenerator, lyrics: req.body.lyrics});
      newHymn.save(function (err) {
        if (err) 
          throw err;
        res.send('new hymn created');
      });
    }
  });

  /* Deletes hymn*/
  app.delete('/hymn/delete', function (req, res) {
    Hymns
      .findByIdAndRemove(req.body.id, function (err, hymn) {
        if (err) 
          throw err;
        res.json(hymn);
      });
  });
}; //end export