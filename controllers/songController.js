const Songs = require("../models/songs");
const passport = require("passport");
const permissions = require("../middleware/PermissionsMiddleware");
const config = require("../config.js");

const song_cache = {
  data: null,
  last_refresh: 0,
  force_reload: function(res) {
    const that = this;
    Songs.find((error, songs) => {
      if (error) {
        that.data = null;
        that.last_refresh = 0;
        if (res != null) res.send(error);
      }
      that.data = songs;
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
  // returns all songs
  app.get("/api/songs", (req, res) => {
    song_cache.send_data(res);
  });

  // returns single song by _id
  app.get("/api/song/:id", (req, res) => {
    Songs.findById(req.params.id, (error, song) => {
      res.send(song);
    });
  });

  // creates song
  app.post(
    "/api/song",
    passport.authenticate("jwt", { session: false }),
    permissions("songbookAllowed"),
    (req, res) => {
      var newSong = Songs(req.body);
      newSong.save((error, song) => {
        error ? res.status(501).send({ error }) : res.send(song);
        song_cache.force_reload();
      });
    }
  );

  // updates song
  app.put(
    "/api/song/:id",
    passport.authenticate("jwt", { session: false }),
    permissions("songbookAllowed"),
    (req, res) => {
      Songs.findByIdAndUpdate(req.params.id, req.body, (error, song) => {
        error ? res.status(501).send({ error }) : res.send(song);
        song_cache.force_reload();
      });
    }
  );

  // deletes song
  app.delete(
    "/api/song/:id",
    passport.authenticate("jwt", { session: false }),
    permissions("songbookAllowed"),
    (req, res) => {
      Songs.findByIdAndRemove(req.params.id, error => {
        error
          ? res.status(501).send({ error })
          : res.send({ message: "Deleted" + req.params.id });
        song_cache.force_reload();
      });
    }
  );
};
