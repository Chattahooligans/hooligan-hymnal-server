var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema(
  {
    rosterTitle: {
      type: String,
      required: "Title is required"
    },
    season: String,
    defaultThumbnail: String,
    defaultImage: String,
    showPlayerSongs: Boolean,
    /*
    players: [
      {
        type: ObjectId,
        ref: "players"
      }
    ],
    */
   players: [{ _id: String, hint: String }],
    active: {
      type: Boolean,
      default: true
    },
    default: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: {
      createdAt: "create_time",
      updatedAt: "update_time"
    }
  }
);
