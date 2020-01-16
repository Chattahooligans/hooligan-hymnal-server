exports.apiCheckPermission = function(option) {
	return (req, res, next) => {
		const { user } = req;
		if (user && option in user) {
			if (user[option]) {
				next();
			} else {
				res.send({ message: "You do not have the correct permissions" });
			}
		}
	};
};

exports.checkPermission = option => {
	return (req, res, next) => {
		if (req.user[option]) {
			return next();
		}
		req.flash("info", `You do not have the correct rights to view ${req.path}`);
		res.redirect("/");
	};
};
