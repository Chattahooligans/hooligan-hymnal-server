const sgVoices = require("../models/sgVoices");
const config = require("../config.js");
const passport = require("passport");
const permissions = require("../middleware/PermissionsMiddleware");

var sgVoices_cache = {
  data: null,
  last_refresh: 0,
  force_reload: function (res) {
    var that = this;
    sgVoices.find((error, voices) => {
      if (error) {
        that.data = null;
        that.last_refresh = 0;
        if (res != null) res.send(error);
      }
      that.data = voices;
      that.last_refresh = Date.now();
      if (res != null) res.send(that.data);
    });
  },
  send_data: function (res) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      this.force_reload(res);
    } else {
      res.send(this.data);
    }
  }
};

module.exports = app => {
  app.get("/api/sgVoices", (req, res) => {
    sgVoices_cache.send_data(res);
    // TODO: only return where .active=true
  });

  // TODO:
  /*
  app.get("/api/sgVoices/all", (req, res) => {
    // require admin user credentials
    // return where .active=true or .active=false
  });
  */

  /*
  // TODO: require admin user credentials
  // creates voice
  app.post(
    "/api/sgVoices",
    (req, res) => {
      var sgVoice = sgVoices(req.body);
      sgVoice.save((error, voice) => {
        error ? res.status(501).send({ error }) : res.send(voice);
        sgVoices_cache.force_reload();
      });
    }
  );
  */
}