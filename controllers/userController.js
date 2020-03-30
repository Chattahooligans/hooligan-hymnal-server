const mongoose = require("mongoose");
const User = mongoose.model("User");
const { promisify } = require("es6-promisify");

exports.resetForm = async (req, res) => {
	return res.render("auth/forgotPassword", {
		title: "Forgot password",
	});
};

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
		title: "Reset your Password",
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

	user.password = req.body.password;
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

exports.account = (req, res) => {
	res.render("auth/account", {
		title: "Your account"
	});
};

exports.updateAccountForm = (req, res) => {
	res.render("auth/updateAccount", {
		title: "Update your account",
	});
};

exports.updateAccount = async (req, res) => {
	const updates = {
		name: req.body.name,
		familyName: req.body.familyName,
		email: req.body.email,
		displayName: req.body.displayName
	};
	await User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $set: updates },
		{ new: true, runValidators: true, context: "query" }
	);
	req.flash("success", "Updated your profile!");
	res.redirect("/account");
};
