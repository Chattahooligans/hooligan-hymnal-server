const cloudinary = require("cloudinary").v2;

exports.removeFromCloudinary = async (folder, url) => {
	if (!url || !folder) return;
	let id = null;
	if (url.search("cloudinary") !== -1) {
		id = url.match(/[\w\d]*\.jpg$/)[0].split(".jpg")[0];
		console.log(id);
		return await cloudinary.uploader.destroy(`${folder}/${id}`);
	}
};
