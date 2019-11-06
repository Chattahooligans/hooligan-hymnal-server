var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId

var feedItem = new Schema(
    {
        sender: { user: ObjectId, pushToken: String },
        publishAt: Date,
        unpublishAt: Date,
        pinnedAt: Date,
        push: Boolean,
        text: { locale: String, text: String },
        images: [{url: String}],
        attachments: [{type: String, id: ObjectId, data: null}],
        active_or_deleted: Boolean
    },
    {
        timestamps: true
    }
);
// timestamps: true adds createdAt and updatedAt automagically