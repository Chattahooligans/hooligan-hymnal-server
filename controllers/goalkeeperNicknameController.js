var GoalkeeperNickname = require("../models/goalkeeperNickname");
var bodyParser = require("body-parser");

module.exports = app => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  // returns most recent goalkeeper nickname
  app.get('/api/goalkeeperNicknames/last', (req, res) => {
    GoalkeeperNickname.find()
      .sort({ createdAt: -1 })
      .limit(1)
      .then(goalkeeperNicknames => {
        if (goalkeeperNicknames.length) {
          res.send(goalkeeperNicknames[0]);
        } else {
          res.status(204).send();
        }
      });
  });

  // returns goalkeeperNickname
  app.get("/api/goalkeeperNicknames", (req, res) => {
    GoalkeeperNickname.find((error, goalkeeperNickname) => {
      if (error) {
        res.status(501).send({error});
      }
      res.send(goalkeeperNickname);
    });
  });

  // creates goalkeeperNickname
  app.post("/api/goalkeeperNicknames", (req, res) => {
    var newGoalkeeperNickname = GoalkeeperNickname(req.body);
    newGoalkeeperNickname.save((error, goalkeeperNickname) => {
      error ? res.status(501).send({error}) : res.send(goalkeeperNickname);
    });
  });
};
