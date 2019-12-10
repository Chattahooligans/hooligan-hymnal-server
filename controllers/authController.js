const passport = require("passport");

exports.loginForm = (req, res) => {
  res.render("auth/login", {
    title: "Login"
  });
};

exports.login = passport.authenticate("local", {
  failureRedirect: "/login",
  failureMessage: "Failed Login!",
  successRedirect: "/",
  successMessage: "You are now logged in!"
});

exports.registerForm = (req, res) => {};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
