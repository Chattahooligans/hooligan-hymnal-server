const Roster = require("../models/roster");
const config = require("../config.js");
const passport = require("passport");
const permission = require("../middleware/PermissionsMiddleware");

var roster_cache = {
  data: null,
  last_refresh: 0,
  force_reload: function(res) {
    var that = this;
    Roster.find((error, roster) => {
      if (error) {
        that.data = null;
        that.last_refresh = 0;
        if (res != null) res.send(error);
      }
      that.data = roster;
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
  // returns rosters
  app.get("/api/roster", (req, res) => {
    roster_cache.send_data(res);
  });

  // creates roster
  app.post(
    "/api/roster",
    passport.authenticate("jwt", { session: false }),
    permission("rosterAllowed"),
    (req, res) => {
      var newRoster = Roster(req.body);
      newRoster.save((error, roster) => {
        error ? res.status(501).send({ error }) : res.send(roster);
        roster_cache.force_reload();
      });
    }
  );

  // updates roster
  app.put(
    "/api/roster/:id",
    passport.authenticate("jwt", { session: false }),
    permission("rosterAllowed"),
    (req, res) => {
      Roster.findByIdAndUpdate(req.params.id, req.body, (error, roster) => {
        error ? res.status(501).send({ error }) : res.send(roster);
        roster_cache.force_reload();
      });
    }
  );

  // deletes roster
  app.delete(
    "/api/roster/:id",
    passport.authenticate("jwt", { session: false }),
    permission("rosterAllowed"),
    (req, res) => {
      Roster.findByIdAndRemove(req.params.id, error => {
        error
          ? res.status(501).send({ error })
          : res.send({ message: "Deleted" + req.params.id });
        roster_cache.force_reload();
      });
    }
  );
};
