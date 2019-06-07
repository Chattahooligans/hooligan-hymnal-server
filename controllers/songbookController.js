var Songbook = require("../models/songbook");
var bodyParser = require("body-parser");
var config = require("../config.js");

var songbook_cache = {
  data: null,
  last_refresh: 0,
  force_reload: function(res) {
    var that = this;
    Songbook.find((error, songbook) => {
      if (error) {
        that.data = null;
        that.last_refresh = 0;
        if(res != null) res.send(error);
      }
      that.data = songbook;
      that.last_refresh = Date.now();
      if(res != null) res.send(that.data);
    });
  },
  send_data: function(res) {
    if(this.last_refresh + config.cache_timeout < Date.now()) {
      this.force_reload(res);
    } else {
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

  // returns songbooks
  app.get("/api/songbook", (req, res) => {
    songbook_cache.send_data(res);
  });

  // creates songbook
  app.post("/api/songbook", (req, res) => {
    var newSongbook = Songbook(req.body);
    newSongbook.save((error, songbook) => {
      error ? res.status(501).send({error}) : res.send(songbook);
      songbook_cache.force_reload();
    });
  });

  // updates songbook
  app.put("/api/songbook/:id", (req, res) => {
    Songbook.findByIdAndUpdate(req.params.id, req.body, (error, songbook) => {
      error ? res.status(501).send({error}) : res.send(songbook);
      songbook_cache.force_reload();
    });
  });

  // deletes songbook
  app.delete("/api/songbook/:id", (req, res) => {
    Songbook.findByIdAndRemove(req.params.id, error => {
      error
        ? res.status(501).send({error})
        : res.send({message: "Deleted" + req.params.id});
        songbook_cache.force_reload();
    });
  });
};
