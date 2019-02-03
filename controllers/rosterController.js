var Roster = require("../models/roster");
var bodyParser = require("body-parser");

module.exports = app => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  // returns rosters
  app.get("/api/roster", (req, res) => {
    Roster.find((error, roster) => {
      if (error) {
        res.status(501).send({error});
      }
      res.send(roster);
    });
  });

  // creates roster
  app.post("/api/roster", (req, res) => {
    var newRoster = Roster(req.body);
    newRoster.save((error, roster) => {
      error ? res.status(501).send({error}) : res.send(roster);
    });
  });

  // updates roster
  app.put("/api/roster/:id", (req, res) => {
    Roster.findByIdAndUpdate(req.params.id, req.body, (error, roster) => {
      error ? res.status(501).send({error}) : res.send(roster);
    });
  });

  // deletes roster
  app.delete("/api/roster/:id", (req, res) => {
    Roster.findByIdAndRemove(req.params.id, error => {
      error
        ? res.status(501).send({error})
        : res.send({message: "Deleted" + req.params.id});
    });
  });
};
