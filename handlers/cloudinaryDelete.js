const cloudinary = require('cloudinary').v2;

exports.removeFromCloudinary = async (folder, url) => {
  if (!url || !folder) return;
  let id = null;
  if (url.search('cloudinary') !== -1) {
    if (url.match(/[\w\d]*\.jpg$/)) {
      id = url.match(/[\w\d]*\.jpg$/)[0].split('.jpg');
    } else if (url.match(/[\w\d]*\.png$/)) {
      url.match(/[\w\d]*\.png$/)[0].split('.png');
    }
    console.log(id);
    return await cloudinary.uploader.destroy(`${folder}/${id}`, {
      invalidate: true,
    });
  }
};
