const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const { ObjectId } = mongoose.Schema.Types;

module.exports = new mongoose.Schema(
  {
    opponent: String,
    competition: String,
    logo: String,
    backgroundColor: String,
    accentColor: String,
    textColor: String,
    season: String,
    active: {
      type: Boolean,
      default: true,
      index: true,
    },
    players: [
      {
        _id: String, name: String, squadNumber: String, position: String,
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'create_time',
      updatedAt: 'update_time',
    },
  },
);
