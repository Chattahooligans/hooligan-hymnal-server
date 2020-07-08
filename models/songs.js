const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const songSchema = require('./schemas/songSchema');

songSchema.post("findOne", function(res) {
    if (res == null) {
        const err = new Error("Song not found");
        err.status = 404;
        throw err;
    }
});

module.exports = mongoose.model('song', songSchema);
