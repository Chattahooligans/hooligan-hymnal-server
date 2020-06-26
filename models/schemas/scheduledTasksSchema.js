var mongoose = require("mongoose");

module.exports = new mongoose.Schema(
  {
    creator: String,
    type: String,
    triggerAt: Date,
    data: mongoose.Schema.Types.Mixed,
    completed: Boolean
  },
  {
    timestamps: {
      createdAt: "createTime",
      updatedAt: "updateTime"
    }
  }
);
