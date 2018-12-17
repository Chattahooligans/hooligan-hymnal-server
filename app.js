let express = require("express");
let app = express();
let mongoose = require("mongoose");

let songController = require("./controllers/songController");
let playerController = require("./controllers/playerController");
let notificationController = require("./controllers/notificationController");
let pushTokenController = require("./controllers/pushTokenController");
let songbookController = require("./controllers/songbookController");

const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use("/assets", express.static(__dirname + "/public"));

// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.set("view engine", "ejs");

mongoose.connect(
  MONGO_URI,
  {useMongoClient: true}
);

songController(app);
playerController(app);
notificationController(app);
pushTokenController(app);
songbookController(app);

app.listen(port);
console.log("app listening on " + port);
