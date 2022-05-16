
const cloudinary = require('cloudinary').v2;
/**
 * Cloudinary Uploader responses
 * export interface UploadApiResponse {
        public_id: string;
        version: number;
        signature: string;
        width: number;
        height: number;
        format: string;
        resource_type: string;
        created_at: string;
        tags: Array<string>;
        pages: number;
        bytes: number;
        type: string;
        etag: string;
        placeholder: boolean;
        url: string;
        secure_url: string;
        access_mode: string;
        original_filename: string;
        moderation: Array<string>;
        access_control: Array<string>;
        context: object;
        metadata: object;

        [futureKey: string]: any;
    }

    export interface UploadApiErrorResponse {
        message: string;
        name: string;
        http_code: number;

        [futureKey: string]: any;
    }
 */

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
        const image = await cloudinary.uploader.upload(path, options);
        images = [...images, image];
      } catch (error) {
        console.error(`Error uploading ${path} to cloudinary: \n Status: ${error.http_status}\n Message: ${error.message}\n`);
      }
    }
  }
  console.info(`Uploaded ${images.length} images`);
  return images;
};
