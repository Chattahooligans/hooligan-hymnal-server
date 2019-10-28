const Roster = require("../models/roster");
const config = require("../config.js");
const passport = require("passport");
const permission = require("../middleware/PermissionsMiddleware");

var roster_cache = {
  data: null,
  last_refresh: 0,
  force_reload: function(res, activeOnly) {
    var that = this;
    Roster.find((error, roster) => {
      if (error) {
        that.data = null;
        that.last_refresh = 0;
        if (res != null) res.send(error);
      }
      that.data = roster;
      that.last_refresh = Date.now();
      if (res != null) {
        if (activeOnly) {
          res.send(this.get_active_rosters(this.data));
        } else {
          res.send(that.data);
        }
      }
    });
  },
  send_data: function(res) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      this.force_reload(res);
    } else {
      res.send(this.data);
    }
  },
  send_active: function(res) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      this.force_reload(res, true);
    } else {
      res.send(this.get_active_rosters(this.data));
    }
  },
  get_active_rosters(data) {
    var active = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].active) active.push(data[i]);
    }
    return active;
  }
};

module.exports = app => {
  // returns rosters
  app.get("/api/roster", (req, res) => {
    roster_cache.send_data(res);
  });

  app.get("/api/roster/active", (req, res) => {
    roster_cache.send_active(res);
  });

  app.get("/api/roster/:id", (req, res) => {
    const { id } = req.params;
    Roster.findById(id, (err, roster) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.send(roster);
    }).populate({
      path: "players",
      select: "name position flag squadNumber"
    });
  });

  // creates roster
  app.post(
    "/api/roster",
    passport.authenticate("jwt", { session: false }),
    permission("rosterAllowed"),
    (req, res) => {
      Roster.create(req.body, (err, roster) => {
        if (err) {
          return res.status(401).send(err);
        }
        roster_cache.force_reload();
        return res.send(roster);
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
      const { id } = req.params;
      Roster.findByIdAndRemove(id, (err, roster) => {
        if (err) {
          return res.status(401).send(err);
        }
        roster_cache.force_reload();
        return res.status(200).send({ message: "Succefully deleted" });
      })
      // Roster.findByIdAndRemove(req.params.id, error => {
      //   error
      //     ? res.status(501).send({ error })
      //     : res.send({ message: "Deleted" + req.params.id });
      //   roster_cache.force_reload();
      //   return;
      // });
    }
  );
};
