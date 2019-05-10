var mongoose = require("mongoose");

module.exports = new mongoose.Schema(
  {
    category: String,
    delete_local: String,
    title: String,
    instructions: String,
    lyrics: String,
    reference_title: String,
    reference_link: String,
    sheetMusicLink: String,
    player_id: String,
    legend: String,
    capoSignal: String
  },
  {
    timestamps: {
      createdAt: "create_time",
      updatedAt: "update_time"
    }
  }
);
