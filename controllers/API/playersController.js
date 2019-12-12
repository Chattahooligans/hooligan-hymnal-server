let Players = require("../../models/players");
let config = require("../../config.js");
const passport = require("passport");
const {
  apiCheckPermission
} = require("../../middleware/PermissionsMiddleware");
// const apiMiddleware = require("../middleware/ApiKeyMiddleware");
const cloudinary = require("cloudinary").v2;

var players_cache = {
  data: null,
  last_refresh: 0,
  force_reload: function(res) {
    var that = this;
    Players.find((error, players) => {
      if (error) {
        that.data = null;
        that.last_refresh = 0;
        if (res != null) res.send(error);
      }
      that.data = players;
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
  // returns all players
  app.get("/api/players", (req, res) => {
    players_cache.send_data(res);
  });

  // returns single player by _id
  app.get("/api/players/:id", (req, res) => {
    Players.findById(req.params.id, (error, player) => {
      res.send(player);
    });
  });

  // upload player thumbnail
  app.post(
    "/api/players/thumbnail-upload",
    passport.authenticate("jwt", { session: false }),
    apiCheckPermission("rosterAllowed"),
    (req, res) => {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded");
      }
      const { playerThumbnail } = req.files;
      const { public_id } = req.body;
      if (public_id !== "") {
        cloudinary.uploader.destroy(public_id, (err, result) => {
          if (err) {
            console.warn(err);
            return;
          }
        });
      }
      cloudinary.uploader
        .upload(playerThumbnail.tempFilePath, {
          tags: "player_thumbnail",
          height: 50,
          width: 50,
          crop: "thumb",
          gravity: "face"
        })
        .then(image => {
          return res.send(image);
        })
        .catch(err => {
          if (err) {
            console.warn(err);
            return;
          }
        });
    }
  );

  // Upload player full image
  app.post(
    "/api/players/full-image",
    passport.authenticate("jwt", { session: false }),
    apiCheckPermission("rosterAllowed"),
    (req, res) => {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded");
      }
      const { playerImage } = req.files;
      const { public_id } = req.body;
      if (public_id !== "") {
        cloudinary.uploader.destroy(public_id, (err, result) => {
          if (err) {
            console.warn(err);
            return;
          }
        });
      }
      cloudinary.uploader
        .upload(playerImage.tempFilePath, {
          tags: "player_image"
        })
        .then(image => {
          return res.send(image);
        })
        .catch(err => {
          if (err) {
            console.warn(err);
            return;
          }
        });
    }
  );

  // creates player
  app.post(
    "/api/players",
    passport.authenticate("jwt", { session: false }),
    apiCheckPermission("rosterAllowed"),
    (req, res) => {
      var newPlayer = Players(req.body);
      newPlayer.save((error, player) => {
        error ? res.status(501).send({ error }) : res.send(player);
        players_cache.force_reload();
      });
    }
  );

  // updates player
  app.put(
    "/api/players/:id",
    passport.authenticate("jwt", { session: false }),
    apiCheckPermission("rosterAllowed"),
    (req, res) => {
      Players.findByIdAndUpdate(req.params.id, req.body, (error, player) => {
        error ? res.status(501).send({ error }) : res.send(player);
        players_cache.force_reload();
      });
    }
  );

  //deletes player
  app.delete(
    "/api/players/:id",
    passport.authenticate("jwt", { session: false }),
    apiCheckPermission("rosterAllowed"),
    (req, res) => {
      Players.findByIdAndRemove(req.params.id, error => {
        error
          ? res.status(501).send({ error })
          : res.send({ message: "Deleted" + req.params.id });
        players_cache.force_reload();
      });
    }
  );
};
