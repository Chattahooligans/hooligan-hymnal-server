const passport = require("passport");
const passportJWT = require("passport-jwt");
const passportLocal = require("passport-local");
const mongoose = require("mongoose");
const User = mongoose.model("User");

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
