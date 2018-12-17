var Songbook = require("../models/songbook");
var bodyParser = require("body-parser");

module.exports = app => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  // returns songbooks
  app.get("/api/songbook", (req, res) => {
    Songbook.find((error, songbook) => {
      if (error) {
        res.status(501).send({error});
      }
      res.send(songbook);
    });
  });

  // creates songbook
  app.post("/api/songbook", (req, res) => {
    var newSongbook = Songbook(req.body);
    newSongbook.save((error, songbook) => {
      error ? res.status(501).send({error}) : res.send(songbook);
    });
  });

  // updates songbook
  app.put("/api/songbook/:id", (req, res) => {
    Songbook.findByIdAndUpdate(req.params.id, req.body, (error, songbook) => {
      error ? res.status(501).send({error}) : res.send(songbook);
    });
  });

  // deletes songbook
  app.delete("/api/songbook/:id", (req, res) => {
    Songbook.findByIdAndRemove(req.params.id, error => {
      error
        ? res.status(501).send({error})
        : res.send({message: "Deleted" + req.params.id});
    });
  });
};
