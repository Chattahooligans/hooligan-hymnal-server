var GoalkeeperNickname = require("../models/goalkeeperNickname");
var bodyParser = require("body-parser");

module.exports = app => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  // returns songbooks
  app.get("/api/goalkeeperNickname", (req, res) => {
    GoalkeeperNickname.find((error, goalkeeperNickname) => {
      if (error) {
        res.status(501).send({error});
      }
      res.send(goalkeeperNickname);
    });
  });

  // creates songbook
  app.post("/api/goalkeeperNickname", (req, res) => {
    var newGoalkeeperNickname = GoalkeeperNickname(req.body);
    newGoalkeeperNickname.save((error, goalkeeperNickname) => {
      error ? res.status(501).send({error}) : res.send(goalkeeperNickname);
    });
  });
};
