var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema(
  {
    sender: String,
    push: Boolean,
    nickname: String,
    backgroundColor: String,
    textColor: String
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);
