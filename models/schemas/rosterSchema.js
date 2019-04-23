var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema(
  {
    rosterTitle: String,
    season: String,
    squads: [
      {
        squadTitle: String,
        players: [{ _id: String, hint: String }]
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
