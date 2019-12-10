var Expo = require("expo-server-sdk");
var bodyParser = require("body-parser");
let expo = new Expo();

module.exports = app => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  // is this the right password?
  app.post("/api/authCheck", (req, res) => {
    if (req.body.authKey !== process.env.AUTH_KEY) {
      res.status(403).send({ error: "bad auth key" });
      return;
    } else {
      res.status(200).send({});
      return;
    }
  });
};
