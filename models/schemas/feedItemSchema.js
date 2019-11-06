var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId

var feedItem = new Schema(
    {
        sender: { user: ObjectId, pushToken: String },
        publishAt: Date,
        unpublishAt: Date,
        pinnedAt: Date,
        push: Boolean,
        text: String || { locale: String, text: String },
        images: [{url: String}],
        attachments: [{type: String, id: ObjectId, data: null}],
        active: Boolean
    },
    {
        strict: false,
        timestamps: true
    }
);
// timestamps: true adds createdAt and updatedAt automagically