const mongoose = require('mongoose');
const foesSchema = require('./schemas/foesSchema');

foesSchema.post("findOne", function(res) {
    if (res == null) {
        const err = new Error("Foe not found");
        err.status = 404;
        throw err;
    }
})

module.exports = mongoose.model('foes', foesSchema);
