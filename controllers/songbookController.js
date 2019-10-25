const Songbook = require("../models/songbook");
const config = require("../config.js");
const passport = require("passport");
const permissions = require("../middleware/PermissionsMiddleware");

var songbook_cache = {
  data: null,
  last_refresh: 0,
  force_reload: function(res) {
    var that = this;
    Songbook.find((error, songbook) => {
      if (error) {
        that.data = null;
        that.last_refresh = 0;
        if (res != null) res.send(error);
      }
      that.data = songbook;
      that.last_refresh = Date.now();
      if (res != null) res.send(that.data);
    });
  },
  send_data: function(res) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      this.force_reload(res);
    } else {
      res.send(this.data);
    }
  }
};

module.exports = app => {
  // returns songbooks
  app.get("/api/songbooks", (req, res) => {
    songbook_cache.send_data(res);
  });

  app.get("/api/songbooks/:id", async (req, res) => {
    const { id } = req.params;
    await Songbook.findById(id, (err, songbook) => {
      if (err) {
        return res.send(404).json({ message: "Songbook Not Found" });
      }
      return res.send(songbook);
    });
  });

  // creates songbook
  app.post(
    "/api/songbooks",
    passport.authenticate("jwt", { session: false }),
    permissions("songbookAllowed"),
    (req, res) => {
      var newSongbook = Songbook(req.body);
      newSongbook.save((error, songbook) => {
        error ? res.status(501).send({ error }) : res.send(songbook);
        songbook_cache.force_reload();
      });
    }
  );

  // updates songbook
  app.put(
    "/api/songbooks/:id",
    passport.authenticate("jwt", { session: false }),
    permissions("songbookAllowed"),
    (req, res) => {
      Songbook.findByIdAndUpdate(req.params.id, req.body, (error, songbook) => {
        error ? res.status(501).send({ error }) : res.send(songbook);
        songbook_cache.force_reload();
      });
    }
  );

  // deletes songbook
  app.delete(
    "/api/songbooks/:id",
    passport.authenticate("jwt", { session: false }),
    permissions("songbookAllowed"),
    (req, res) => {
      Songbook.findByIdAndRemove(req.params.id, error => {
        error
          ? res.status(501).send({ error })
          : res.send({ message: "Deleted" + req.params.id });
        songbook_cache.force_reload();
      });
    }
  );
};
