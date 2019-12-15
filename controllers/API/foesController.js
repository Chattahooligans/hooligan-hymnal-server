// const Foes = require("../../models/foes");
const mongoose = require("mongoose");
const Foes = mongoose.model("foes");
const config = require("../../config.js");
const passport = require("passport");
const {
  apiCheckPermission
} = require("../../middleware/PermissionsMiddleware");

var foes_cache = {
  data: null,
  last_refresh: 0,
  force_reload: async function(res) {
    let that = this;
    const foes = await Foes.find();
    that.data = foes;
    that.last_refresh = Date.now();
    res.send(that.data);
  },
  send_data: async function(res) {
    if (this.last_refresh + config.cache_timeout < Date.now()) {
      await this.force_reload(res);
    } else {
      res.send(this.data);
    }
  }
};

exports.index = async (req, res) => {
  await foes_cache.send_data(res);
};

exports.show = async (req, res) => {
  const foe = await Foes.findById(req.params.id);
  res.json(foe);
};

exports.store = async (req, res) => {
  const foe = new Foes(req.body);
  await Promise.all([foes_cache.force_reload(res), foe.save()]);
  res.json(foe);
};

// module.exports = app => {
//   // returns all players
//   // app.get("/api/foes", (req, res) => {
//   //   foes_cache.send_data(res);
//   // });

//   // returns single player by _id
//   app.get("/api/foes/:id", (req, res) => {
//     Foes.findById(req.params.id, (error, foe) => {
//       res.send(foe);
//       foes_cache.force_reload();
//     });
//   });

//   // creates player
//   app.post(
//     "/api/foes",
//     passport.authenticate("jwt", { session: false }),
//     apiCheckPermission("foesAllowed"),
//     (req, res) => {
//       var newFoe = Foes(req.body);
//       newFoe.save((error, foe) => {
//         error ? res.status(501).send({ error }) : res.send(foe);
//         foes_cache.force_reload();
//       });
//     }
//   );

//   // updates player
//   app.put(
//     "/api/foes/:id",
//     passport.authenticate("jwt", { session: false }),
//     apiCheckPermission("foesAllowed"),
//     (req, res) => {
//       Foes.findByIdAndUpdate(req.params.id, req.body, (error, foe) => {
//         error ? res.status(501).send({ error }) : res.send(foe);
//         foes_cache.force_reload();
//       });
//     }
//   );

//   //deletes player
//   app.delete(
//     "/api/foes/:id",
//     passport.authenticate("jwt", { session: false }),
//     apiCheckPermission("foesAllowed"),
//     (req, res) => {
//       Foes.findByIdAndRemove(req.params.id, error => {
//         error
//           ? res.status(501).send({ error })
//           : res.send({ message: "Deleted" + req.params.id });
//         foes_cache.force_reload();
//       });
//     }
//   );
// };
