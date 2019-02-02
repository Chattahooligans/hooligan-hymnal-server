var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema(
  {
    songbook_title: String,
    organization: String,
    description: String,
    front_cover: String,
    back_cover: String,
    some_publish_or_expiration_dates: String,
    chapters: [
      {
        chapter_title: String,
        songs: [{ _id: String }]
      }
    ]
  },
  {
    timestamps: {
      createdAt: "create_time",
      updatedAt: "update_time"
    }
  }
);
