const env = require("dotenv").config();
var config = {};

config.cache_timeout = 15 * 60 * 1000; //15 minutes
const CLOUDINARY_URL = process.env.CLOUDINARY_URL;

if (CLOUDINARY_URL) {
	config.CLOUDINARY_API_KEY = CLOUDINARY_URL.split(":")[1].replace("//", "");
	config.CLOUDINARY_CLOUDNAME = CLOUDINARY_URL.split("@")[1];
}
module.exports = config;
