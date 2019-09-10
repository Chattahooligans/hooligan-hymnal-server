var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema(
  {
    opponent: String,
    players: [{ _id: String, name: String, squadNumber: String, position: String }]
  },
  {
    timestamps: {
      createdAt: "create_time",
      updatedAt: "update_time"
    }
  }
);
