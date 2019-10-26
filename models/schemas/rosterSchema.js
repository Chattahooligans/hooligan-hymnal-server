var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema(
  {
    rosterTitle: String,
    season: String,
    players: [{ _id: String, hint: String }],
    active: Boolean,
    default: Boolean
  },
  {
    timestamps: {
      createdAt: "create_time",
      updatedAt: "update_time"
    }
  }
);
