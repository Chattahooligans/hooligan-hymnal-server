const mongoose = require("mongoose");
const passport = require("passport");
const { check, validationResult } = require("express-validator");
const User = mongoose.model("User");

exports.loginForm = (req, res) => {
  res.render("auth/login", {
    title: "Login"
  });
};

exports.login = passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: "Failed Login!",
  successRedirect: "/",
  successFlash: "You are now logged in!"
});

exports.registerForm = (req, res) => {
  res.render("auth/register", {
    title: "Register"
  });
};

exports.validateRegister = (req, res, next) => {
  check("name")
    .not()
    .isEmpty()
    .withMessage("You must supply a first name!");
  check("familyName")
    .not()
    .isEmpty()
    .withMessage("You must supply a last name!");
  check("email")
    .not()
    .isEmpty()
    .withMessage("You must supply a email!")
    .isEmail()
    .normalizeEmail({
      gmail_remove_dots: false,
      gmail_remove_subaddress: false
    });
  check("displayName")
    .not()
    .isEmpty()
    .withMessage("Display name is required");
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password cannot be blank");
  check("passwordConfirm")
    .not()
    .isEmpty()
    .withMessage("Confirmed Password cannot be blank");
  check("passwordConfirm")
    .equals(req.body.password)
    .withMessage("Opps Your passwords do not match");

  const errors = validationResult(req.body);
  if (errors.length) {
    req.flash("error", errors.map(err => err.msg));
    res.render("auth/register", {
      title: "Register",
      body: req.body,
      flashes: req.flash()
    });
    return;
  }
  next();
};

exports.register = async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    familyName: req.body.familyName,
    displayName: req.body.displayName
  });
  const users = await User.find({});
  if (users.length === 0) {
    console.log();
    user.pushNotificationsAllowed = true;
    user.rosterAllowed = true;
    user.songbookAllowed = true;
    user.foesAllowed = true;
    user.usersAllowed = true;
  }
  // res.send("Users");
  await User.register(user, req.body.password);
  next();
};

exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "You are now logged out! 👋");
  res.redirect("/");
};
