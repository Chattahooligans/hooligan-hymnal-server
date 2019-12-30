var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema(
    {
        _id: ObjectId,
        name: String,
        defaultLocale: String,
        description: String,
        avatarUrl: String,
        follow: Boolean,
        active: Boolean
    },
    {
        strict: false,
        timestamps: true
    }
);