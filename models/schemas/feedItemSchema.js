var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId

var feedItem = new Schema(
    {
        sender: { user: ObjectId, pushToken: String },
        voice: ObjectId,
        publishAt: Date,
        unpublishAt: Date,
        pinnedAt: Date,
        push: Boolean,
        text: {
            type: Map,
            of: { text: String, apiTranslated: Boolean }
        },
        images: {
            type: Map,
            of: [
                { url: String, credit: String, default: Boolean }
            ]
        },
        attachments: [{type: String, id: ObjectId, data: null}],
        active: Boolean
    },
    {
        strict: false,
        timestamps: true
    }
);
// timestamps: true adds createdAt and updatedAt automagically