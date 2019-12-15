var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required"
    },
    flag: String,
    squadNumber: String,
    position: String,
    team: String,
    bio: {
      type: Map,
      of: String
    },
    thumbnail: String,
    image: String,
    twitter: String,
    instagram: String
  },
  {
    timestamps: {
      createdAt: "create_time",
      updatedAt: "update_time"
    }
  }
);
