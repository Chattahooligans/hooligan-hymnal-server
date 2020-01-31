const mongoose = require("mongoose");
const User = mongoose.model("User");
const { check, validationResult } = require("express-validator");

exports.allUsers = async (req, res) => {
	const users = await User.find({})
		.where({
			email: {
				$ne: req.user.email,
			},
		})
		.sort({ lastLogin: "desc" });
	res.render("users/index", {
		title: "All Users",
		users,
	});
};

exports.newUserForm = (req, res) => {
	res.render("users/create", {
		title: "Create User",
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
			gmail_remove_subaddress: false,
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
			errors.map((err) => err.msg),
		);
		res.render("users/create", {
			title: "Create User",
			body: req.body,
			flashes: req.flash(),
		});
		return;
	}
	next();
};

exports.register = async (req, res) => {
	const user = new User({
		email: req.body.email,
		name: req.body.name,
		familyName: req.body.familyName,
		displayName: req.body.displayName,
		password: req.body.password,
	});
	if (req.body.permissions) {
		req.body.permissions.map((permission) => {
			user[permission] = true;
		});
	}
	await user.save();
	req.flash("success", `${user.fullname} was created!`);
	res.redirect("/users");
	// Might implement a checkbox that allows a password reset email to be sent??
};

exports.singleUser = async (req, res) => {
	const user = await User.findById(req.params.id);
	res.render("users/show", {
		title: `${user.name}'s Info`,
		user,
	});
};

exports.editForm = async (req, res) => {
	const user = await User.findById(req.params.id);
	res.render("users/edit", {
		title: `Edit ${user.name}`,
		user,
	});
};

exports.updateUser = async (req, res) => {
	const updates = {
		name: req.body.name,
		familyName: req.body.familyName,
		email: req.body.email,
		displayName: req.body.displayName,
	};
	const tempUser = await User.findById(req.params.id);
	if (req.body.permissions) {
		req.body.permissions.map((permission) => {
			updates[permission] = !tempUser[permission];
		});
	}
	const user = await User.findOneAndUpdate(
		{ _id: req.params.id },
		{ $set: updates },
		{ new: true, runValidators: true, context: "query" },
	);
	req.flash("success", `${user.fullname} has been updated!`);
	res.redirect(`/users/${user._id}`);
};

exports.deleteConfirm = async (req, res) => {
	const user = await User.findById(req.params.id);
	res.render("users/delete-confirm", {
		title: `Delete ${user.name}`,
		user,
	});
};

exports.delete = async (req, res) => {
	const user = await User.findByIdAndDelete(req.params.id);
	req.flash("success", `${user.fullname} has been deleted!`);
	res.redirect("/users");
};
