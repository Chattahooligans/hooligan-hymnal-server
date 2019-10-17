var express = require("express");
var path = require("path");
var app = express();
var mongoose = require("mongoose");
var env = require("dotenv");
var bodyParser = require("body-parser");
var fs = require("fs");
var morgan = require("morgan");
var cors = require("cors");
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var serveStatic = require("serve-static");
var history = require("express-history-api-fallback");
var User = require("./models/users");
const apiKeyMiddleware = require("./middleware/ApiKeyMiddleware");

env.config();

var secretOrKey = process.env.SECRET_KEY || "NOTsoSECRETkey";
var JWTOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretOrKey
};

var port = process.env.PORT || 3000;
var MONGO_URI = process.env.MONGO_URI;

app.use("/assets", express.static(__dirname + "/public"));
// app.use(express.static(`${__dirname}/frontend/dist`));
// app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

passport.use(
  new JwtStrategy(JWTOptions, function(jwt_payload, done) {
    var { id } = jwt_payload;
    User.findOne({ _id: id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

// Add headers
// app.use(function(req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Request methods you wish to allow
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

// app.set("view engine", "ejs");
mongoose
  .connect(
    MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    function() {
      console.log(`Connection has been made`);
    }
  )
  .catch(function(err) {
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
app.use(serveStatic(__dirname + "/dist"));
// app.use(history("index.html", `${__dirname}/dist/`));
app.all("*", (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(port, function() {
  console.log(`app listening on http://localhost:${port}`);
});
