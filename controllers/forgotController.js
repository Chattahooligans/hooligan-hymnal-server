const mongoose = require("mongoose");
const User = mongoose.model("User");
const crypto = require("crypto");
const mail = require("../handlers/mail");
const { check } = require("express-validator");

exports.forgot = async (req, res) => {
	check("email")
		.not()
		.isEmpty()
		.isEmail()
		.normalizeEmail({
			gmail_remove_dots: false,
			gmail_remove_subaddress: false
		});
	const timeOffset = 3600000;
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		req.flash("error", "No account with that email exists!");
		return res.redirect("/login");
	}
	if (user.resetPasswordExpires < Date.now() + timeOffset) {
		req.flash("error", "You already asked for a reset email this hour. Please check your spam folder if you can not find it.");
		return res.redirect("/login");
	}
	user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
	user.resetPasswordExpires = Date.now() + timeOffset;
	await user.save();
	const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
	await mail.send({
		user,
		subject: "Password Reset",
		resetURL,
		filename: "password-reset"
	});
	req.flash("success", "You have been emailed a reset link.");
	res.redirect("/login");
};
