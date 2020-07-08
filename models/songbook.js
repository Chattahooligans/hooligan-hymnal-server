var mongoose = require("mongoose");
var songbookSchema = require("./schemas/songbookSchema");

songbookSchema.post("findOne", function(res) {
    if (res == null) {
        const err = new Error("Songbook not found");
        err.status = 404;
        throw err;
    }
})

module.exports = mongoose.model("songbook", songbookSchema);
