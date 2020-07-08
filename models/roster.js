var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var rosterSchema = require("./schemas/rosterSchema");

rosterSchema.post("findOne", function(res) {
    if (res == null) {
        const err = new Error("Roster not found");
        err.status = 404;
        throw err;
    }
});

module.exports = mongoose.model("roster", rosterSchema);
