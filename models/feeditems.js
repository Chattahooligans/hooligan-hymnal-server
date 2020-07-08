const mongoose = require('mongoose');
const feedItemSchema = require('./schemas/feedItemSchema');

feedItemSchema.post("findOne", function(res) {
    if (res == null) {
        const err = new Error("Feed Item not found");
        err.status = 404;
        throw err;
    }
})

module.exports = mongoose.model('feedItem', feedItemSchema);
