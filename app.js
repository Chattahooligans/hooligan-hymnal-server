let express = require("express");
let path = require("path");
let app = express();
let mongoose = require("mongoose");
let env = require('dotenv').config();

let pushTokenController = require("./controllers/pushTokenController");
let notificationController = require("./controllers/notificationController");
let songController = require("./controllers/songController");
let songbookController = require("./controllers/songbookController");
let playersController = require("./controllers/playersController");
let rosterController = require("./controllers/rosterController");
let goalkeeperNicknameController = require("./controllers/goalkeeperNicknameController");
let authCheckController = require("./controllers/authCheckController");
let foesController = require("./controllers/foesController");
let usersController = require("./controllers/usersController");

let config = require("./config");

const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use("/assets", express.static(__dirname + "/public"));
app.use(express.static(`${__dirname}/client/build`));

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

mongoose.connect(MONGO_URI, { useMongoClient: true });

pushTokenController(app);
notificationController(app);
songController(app);
songbookController(app);
playersController(app);
rosterController(app);
goalkeeperNicknameController(app);
authCheckController(app);
foesController(app);
usersController(app);

//! Intercepts all other requests and routes them to React(@reach-router)
app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

app.listen(port);
console.log("app listening on " + port);
