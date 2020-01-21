const passport = require("passport");
const passportJWT = require("passport-jwt");
const { Strategy: LocalStrategy } = require("passport-local");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const env = require("dotenv");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

env.config();

var secretOrKey = process.env.SECRET_KEY || "NOTsoSECRETkey";
var JWTOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secretOrKey
};

// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

passport.use(
	new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
		User.findOne({ email: email.toLowerCase() }, (err, user) => {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, { msg: `Email ${email} not found.` });
			}
			if (!user.password) {
				return done(null, false, {
					msg:
            "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile."
				});
			}
			user.comparePassword(password, (err, isMatch) => {
				if (err) {
					return done(err);
				}
				if (isMatch) {
					return done(null, user);
				}
				return done(null, false, { msg: "Invalid email or password." });
			});
		});
	})
);

passport.use(
	new JwtStrategy(JWTOptions, function(jwt_payload, done) {
		var { id } = jwt_payload;
		User.findOne(
			{
				_id: id
			},
			(err, user) => {
				if (err) {
					return done(err, false);
				}
				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			}
		);
	})
);
