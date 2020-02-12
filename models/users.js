const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const bcryptjs = require('bcrypt');
const md5 = require('md5');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const UserSchema = require('./schemas/userSchema');

UserSchema.virtual('gravatar').get(function () {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

UserSchema.virtual('fullname').get(function () {
  return `${this.name} ${this.familyName}`;
});

UserSchema.plugin(mongodbErrorHandler);

UserSchema.pre('save', async function save(next) {
  const user = this;
  let err = {};
  if (!user.isModified('password')) {
    return next();
  }
  const salt = await bcryptjs.genSalt(10);
  if (!salt) {
    err = new Error('Error creating salt');
    return next(err);
  }
  const hash = await bcryptjs.hash(user.password, salt);
  if (!hash) {
    err = new Error('Error hashing password');
    return next(err);
  }
  user.password = hash;
  next();
});

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb,
) {
  bcryptjs.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
