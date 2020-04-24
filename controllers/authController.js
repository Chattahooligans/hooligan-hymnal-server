const mongoose = require("mongoose");
const passport = require("passport");
const { check, validationResult } = require("express-validator");
const User = mongoose.model("User");

exports.loginForm = (req, res) => {
	res.render("auth/login", {
		title: "Login"
	});
};

exports.login = (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			req.flash("error", "Incorrect Email or Password");
			return res.redirect("/login");
		}
		req.logIn(user, err => {
			if (err) return next(err);
			user.lastLogin = Date.now();
			user.save();
			var redirectTo = req.session.redirectTo || "/";
			// TODO: Add a check with query params??
			delete req.session.redirectTo;
			return res.redirect(`${redirectTo}`);
		});
	})(req, res, next);
};

exports.registerForm = (req, res) => {
	res.render("auth/register", {
		title: "Register",
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
		.withMessage("Oops Your passwords do not match");

	const errors = validationResult(req.body);
	if (errors.length) {
		req.flash(
			"error",
			errors.map(err => err.msg)
		);
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
	let user = await User.findOne({
		email: req.body.email
	});
	if (user) {
		req.flash("error", "Account already exists");
		res.redirect("back");
		return;
	}
	user = new User({
		email: req.body.email,
		name: req.body.name,
		familyName: req.body.familyName,
		displayName: req.body.displayName,
		password: req.body.password
	});
	const users = await User.find({});
	if (users.length === 0) {
		user.pushNotificationsAllowed = true;
		user.rosterAllowed = true;
		user.songbookAllowed = true;
		user.foesAllowed = true;
		user.feedAllowed = true;
		user.usersAllowed = true;
	}
	await user.save();
	next();
};

exports.logout = (req, res) => {
	req.logout();
	req.flash("success", "You are now logged out! 👋");
	res.redirect("/");
};
