const mongoose = require('mongoose');
const channelSchema = require('./schemas/channelSchema');

channelSchema.post("findOne", function(res){
    if (res == null) {
        const err = new Error("Channel not found");
        err.status = 404;
        throw err;
    }
});

module.exports = mongoose.model('channels', channelSchema);
