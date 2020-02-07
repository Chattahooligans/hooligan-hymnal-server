const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      index: {
        unique: true,
      },
    },
    name: {
      type: String,
      required: true,
    },
    familyName: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    pushNotificationsAllowed: {
      type: Boolean,
      default: false,
    },
    rosterAllowed: {
      type: Boolean,
      default: false,
    },
    songbookAllowed: {
      type: Boolean,
      default: false,
    },
    foesAllowed: {
      type: Boolean,
      default: false,
    },
    feedAllowed: {
      type: Boolean,
      default: false,
    },
    usersAllowed: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    // toJSON: {
    // 	virtuals: true
    // },
    toObject: {
      virtuals: true,
    },
  },
);
