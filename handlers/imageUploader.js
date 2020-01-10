
const cloudinary = require("cloudinary").v2;

/**
 * @param {Request} req
 * @param {Response} res
 */
exports.upload = async (req, options) => {
	const files = req.files;
	for(const file in files) {
		if (files.hasOwnProperty(file)) {
			const path = files[file].tempFilePath;
			const image = await cloudinary.uploader.upload(path, options);
			return image;
		}
	}
};
