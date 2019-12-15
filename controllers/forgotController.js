const mongoose = require("mongoose");
const User = mongoose.model("User");
const crypto = require("crypto");

exports.forgot = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash("error", "No account with that email exists!");
    return res.redirect("/login");
  }
  user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordExpires = Date.now() + 3600000;
  user.displayName = "a";
  user.familyName = "a";
  user.name = "a";
  await user.save();
  const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
  req.flash("success", "You have been emailed a reset link.");
  req.flash("info", `<a href="${resetURL}">${resetURL}</a>`);
  res.redirect("/login");
};
