const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const { ObjectId } = mongoose.Schema.Types;

module.exports = new mongoose.Schema(
  {
    sender: { user: String, pushToken: String },
    publishedAt: Date,
    unpublishedAt: Date,
    push: Boolean,
    channel: String,
    locale: String,
    text: String,
    images: [{
      uri: String,
      thumbnailUri: String,
      metadata: {
        caption: String,
        credit: String,
      },
      // caption: String,
      // credit: String
    }],
    attachments: [{ attachmentType: String, relatedId: String, data: {} }],
    active: Boolean,
  },
  {
    timestamps: true,
  },
);
// timestamps: true adds createdAt and updatedAt automagically

// TODO: Figure out future publish/unpublish times using publishedAt/unpublishedAt
// For now, just set publishedAt to the same as createdAt
// TODO: Figure out how we want pinned posts to work
