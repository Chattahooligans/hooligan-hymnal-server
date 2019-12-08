var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema(
  {
    rosterTitle: String,
    season: String,
    /*
    players: [
      {
        type: ObjectId,
        ref: "players"
      }
    ],
    */
   players: [{ _id: String, hint: String, overridePosition: String, overrideSquadNumber: String }],
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
