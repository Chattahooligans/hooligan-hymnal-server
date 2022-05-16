
const cloudinary = require('cloudinary').v2;

function uploadToCloudinary(image, options) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, options, (err, url) => {
      if (err) return reject(err);
      return resolve(url);
    })
  })
}

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
      console.info(`Uploading ${path}`);
      // TODO: See if we can upload the images based on type to cloudinary
      if (!options.format) {
        options.format = files[file].mimetype.split('/')[1];
      }
      try {
        const image = await uploadToCloudinary(path, options);
        images = [...images, image];
      } catch (error) {
        console.error(`Error uploading ${path} to cloudinary: ${error}`);
      }
    }
  }
  console.info(`Uploaded ${images.length} images`);
  return images;
};
