let express = require("express");
let path = require("path");
let app = express();
let mongoose = require("mongoose");
const env = require("dotenv");
const bodyParser = require("body-parser");
const fs = require("fs");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const User = require("./models/users");

let config = require("./config");

env.config();
const secretOrKey = process.env.SECRET_KEY || "NOTsoSECRETkey";
const JWTOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretOrKey
};

const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use("/assets", express.static(__dirname + "/public"));
app.use(express.static(`${__dirname}/client/build`));
app.use(bodyParser.json());
app.use(passport.initialize());

passport.use(
  new JwtStrategy(JWTOptions, function(jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        done(null, false);
      }
    });
  })
);

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
mongoose
  .connect(MONGO_URI, function() {
    console.log(`Connection has been made`);
  })
  .catch(function() {
    console.log(`App starting error:`, err.stack);
    process.exit(1);
  });

// Autoloads all controllers in directory
fs.readdirSync("controllers").forEach(function(file) {
  if (file.substr(-3) === ".js") {
    const controller = require(`./controllers/${file}`);
    controller(app);
  }
});

//! Intercepts all other requests and routes them to React(@reach-router)
app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

app.listen(port, function() {
  console.log(`app listening on http://localhost:${port}`);
});
