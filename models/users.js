var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// var userSchema = require("./schemas/userSchema");
const Schema = mongoose.Schema;
const bcryptjs = require("bcrypt");
const md5 = require("md5");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");
const axios = require("axios");

const UserSchema = new Schema(
	{
		email: {
			type: String,
			lowercase: true,
			trim: true,
			index: {
				unique: true
			}
		},
		name: {
			type: String,
			required: true
		},
		familyName: {
			type: String,
			required: true
		},
		displayName: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		pushNotificationsAllowed: {
			type: Boolean,
			default: false
		},
		rosterAllowed: {
			type: Boolean,
			default: false
		},
		songbookAllowed: {
			type: Boolean,
			default: false
		},
		foesAllowed: {
			type: Boolean,
			default: false
		},
		feedAllowed: {
			type: Boolean,
			default: false,
		},
		usersAllowed: {
			type: Boolean,
			default: false
		},
		lastLogin: {
			type: Date,
			default: null
		},
		password: String,
		resetPasswordToken: String,
		resetPasswordExpires: Date
	},
	{
		toJSON: {
			virtuals: true
		},
		toObject: {
			virtuals: true
		}
	}
);

UserSchema.virtual("gravatar").get(function() {
	const hash = md5(this.email);
	return `https://gravatar.com/avatar/${hash}?s=200`;
});

UserSchema.virtual("fullname").get(function() {
	return `${this.name} ${this.familyName}`;
});

// UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });
UserSchema.plugin(mongodbErrorHandler);

UserSchema.pre("save", async function save(next) {
	const user = this;
	let err = {};
	if (!user.isModified("password")) {
		return next();
	}
	const salt = await bcryptjs.genSalt(10);
	if (!salt) {
		err = new Error("Error creating salt");
		return next(err);
	}
	const hash = await bcryptjs.hash(user.password, salt);
	if (!hash) {
		err = new Error("Error hashing password");
		return next(err);
	}
	user.password = hash;
	next();
	// bcryptjs.genSalt(10, (err, salt) => {
	//   if (err) {
	//     return next(err);
	//   }
	//   bcryptjs.hash(user.password, salt, (err, hash) => {
	//     if (err) return next(err);
	//     user.password = hash;
	//     next();
	//   });
	// });
});

UserSchema.methods.comparePassword = function comparePassword(
	candidatePassword,
	cb
) {
	bcryptjs.compare(candidatePassword, this.password, (err, isMatch) => {
		cb(err, isMatch);
	});
};

const User = mongoose.model("User", UserSchema);
module.exports = User;

// /**
//  * @param {User} newUser
//  * @param {Function} callback
//  *
//  * @return {boolean} newUserResource
//  */
// module.exports.createUser = (newUser, callback) => {
//   bcryptjs.genSalt(10, (err, salt) => {
//     bcryptjs.hash(newUser.password, salt, (error, hash) => {
//       const newUserResource = newUser;
//       User.find({}, (err, user) => {
//         if (!user.length) {
//           newUserResource.songbookAllowed = true;
//           newUserResource.pushNotificationsAllowed = true;
//           newUserResource.rosterAllowed = true;
//           newUserResource.foesAllowed = true;
//           newUserResource.usersAllowed = true;
//         }
//         newUserResource.password = hash;
//         newUserResource.save(callback);
//       });
//     });
//   });
// };

/**
 * @param {String} email
 * @param {Function} callback
 *
 * @return {Function} callback
 */
module.exports.getUserByEmail = (email, callback) => {
	User.find({ email: email }, "_id email password", callback);
};

/**
 * @param {String} canidatePassword
 * @param {String} hash
 * @param {Function} callback
 *
 * @return {Function} callback(null, isMatch)
 */
module.exports.comparePassword = (canidatePassword, hash, callback) => {
	bcryptjs.compare(canidatePassword, hash, (err, isMatch) => {
		if (err) throw err;
		callback(null, isMatch);
	});
};
