const passport = require("passport");
const passportJWT = require("passport-jwt");
const passportLocal = require("passport-local");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const env = require("dotenv");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

env.config();

var secretOrKey = process.env.SECRET_KEY || "NOTsoSECRETkey";
var JWTOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretOrKey
};

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(
  new JwtStrategy(JWTOptions, function(jwt_payload, done) {
    var { id } = jwt_payload;
    User.findOne(
      {
        _id: id
      },
      (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    );
  })
);
