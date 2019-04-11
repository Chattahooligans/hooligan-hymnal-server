var mongoose = require("mongoose");

module.exports = new mongoose.Schema(
  {
    category: String,
    delete_local: String,
    instructions: String,
    lyrics: String,
    player_id: String,
    reference_link: String,
    reference_title: String,
    legend: String,
    title: String
  },
  {
    timestamps: {
      createdAt: "create_time",
      updatedAt: "update_time"
    }
  }
);
