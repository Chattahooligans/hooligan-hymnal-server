const env = require("dotenv").config();
var config = {};

config.cache_timeout = 15 * 60 * 1000; //15 minutes
config.api_key = process.env.API_KEY;

module.exports = config;
