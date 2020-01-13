
const cloudinary = require("cloudinary").v2;

/**
 * @param {Request} req
 * @param {Response} res
 */
exports.upload = async (req, options) => {
	const files = req.files;
	const images = [];
	for(const file in files) {
		if (files.hasOwnProperty(file)) {
			const path = files[file].tempFilePath;
			const image = await cloudinary.uploader.upload(path, options);
			images.push(image);
		}
	}
	if (images.length === 1) {
		return images[0];
	}
	return images;
};
