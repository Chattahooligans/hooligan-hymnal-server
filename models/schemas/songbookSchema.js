const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const { ObjectId } = mongoose.Schema.Types;

module.exports = new mongoose.Schema(
  {
    songbookTitle: {
      type: String,
      required: 'Title is required',
    },
    organization: String,
    description: String,
    frontCover: String,
    backCover: String,
    somePublishOrExpirationDates: String,
    chapters: [
      {
        chapterTitle: String,
        songs: [{ _id: String, featured: Boolean, hint: String }],
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'createTime',
      updatedAt: 'updateTime',
    },
  },
);
