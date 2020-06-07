const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'Name is required',
    },
    flag: String,
    squadNumber: String,
    position: String,
    team: String,
    bio: {
      type: Map,
      of: String,
    },
    thumbnail: String,
    image: String,
    images: [
      String,
    ],
    twitter: String,
    instagram: String,
  },
  {
    timestamps: {
      createdAt: 'createTime',
      updatedAt: 'updateTime',
    },
    toObject: {
      virtuals: true,
    },
  },
);
