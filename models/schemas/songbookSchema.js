const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const { ObjectId } = mongoose.Schema.Types;

module.exports = new mongoose.Schema(
  {
    songbook_title: {
      type: String,
      required: 'Title is required',
    },
    organization: String,
    description: String,
    front_cover: String,
    back_cover: String,
    some_publish_or_expiration_dates: String,
    chapters: [
      {
        chapter_title: String,
        songs: [{ _id: String, featured: Boolean, hint: String }],
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'create_time',
      updatedAt: 'update_time',
    },
  },
);
