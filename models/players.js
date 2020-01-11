var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var playersSchema = require("./schemas/playersSchema");
const cloudinary = require("cloudinary").v2;
const { removeFromCloudinary } = require("../handlers/cloudinaryDelete");
playersSchema.pre("remove", async function (next) {
	await removeFromCloudinary(this.thumbnail);
	// let thumbnailId = null;
	// if (this.thumbnail) {
	// 	if (this.thumbnail.search("cloudinary") !== -1) {
	// 		thumbnailId = this.thumbnail.match(/[\w\d]*\.jpg$/)[0].split(".jpg")[0];
	// 		await cloudinary.uploader.destroy("players_thumbnails/"+thumbnailId);
	// 	}
	// }
	next();
});

module.exports = mongoose.model("players", playersSchema);
