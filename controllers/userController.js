const mongoose = require("mongoose");
const User = mongoose.model("User");
const { promisify } = require("es6-promisify");

exports.reset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  });
  if (!user) {
    req.flash("error", "Password reset is invalid or expired");
    return res.redirect("/login");
  }
  res.render("auth/reset", {
    title: "Reset your Password"
  });
};

exports.confirmPassword = (req, res, next) => {
  if (req.body.password === req.body.passwordConfirm) {
    next();
    return;
  }
  req.flash("error", "Passwords to not match!");
  res.redirect("back");
};

exports.update = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  });
  if (!user) {
    req.flash("error", "Password reset is invalid or expired");
    return res.redirect("/login");
  }
  await user.setPassword(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  const updatedUser = await user.save();
  await req.login(updatedUser);
  req.flash(
    "success",
    "Nice! Your password has been reset! You are now logged in!"
  );
  res.redirect("/");
};
