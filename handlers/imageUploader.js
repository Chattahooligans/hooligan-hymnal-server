
const cloudinary = require('cloudinary').v2;

/**
 * @param {Request} req
 * @param {Response} res
 */
exports.upload = async (req, options) => {
  const { files } = req;
  let images = [];
  for (const file in files) {
    if (files.hasOwnProperty(file)) {
      const path = files[file].tempFilePath;
      // TODO: See if we can upload the images based on type to cloudinary
      if (!options.format) {
        options.format = files[file].mimetype.split('/')[1];
      }
      const image = await cloudinary.uploader.upload(path, options);
      images = [...images, image];
    }
  }
  /*
  if (images.length === 1) {
    return images[0];
  }
  */
  return images;
};
