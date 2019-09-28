var mongoose = require("mongoose");
// var userSchema = require("./schemas/userSchema");
const Schema = mongoose.Schema;
const bcryptjs = require("bcrypt");

const UserSchema = new Schema({
  email: {
    type: String,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true,
    select: false
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
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

/**
 * @param {User} newUser
 * @param {Function} callback
 *
 * @return {boolean} newUserResource
 */
module.exports.createUser = (newUser, callback) => {
  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(newUser.password, salt, (error, hash) => {
      const newUserResource = newUser;
      newUserResource.password = hash;
      newUserResource.pushNotificationsAllowed = false;
      newUserResource.rosterAllowed = false;
      newUserResource.songbookAllowed = false;
      newUserResource.foesAllowed = false;
      newUserResource.save(callback);
    });
  });
};

/**
 * @param {String} email
 * @param {Function} callback
 *
 * @return {Function} callback
 */
module.exports.getUserByEmail = (email, callback) => {
  const query = { email };
  User.findOne({ email }, "password", callback);
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
