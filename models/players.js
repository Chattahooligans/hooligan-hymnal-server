var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var playersSchema = require("./schemas/playersSchema");

const { removeFromCloudinary } = require("../handlers/cloudinaryDelete");

playersSchema.pre("remove", async function (next) {
	await removeFromCloudinary("players_thumbnails", this.thumbnail);
	for(let image of this.images) {
		await removeFromCloudinary("players_images", image);
	}
	next();
});

module.exports = mongoose.model("players", playersSchema);
