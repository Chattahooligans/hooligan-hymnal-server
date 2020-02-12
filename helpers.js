// const fs = require("fs");
require('dotenv').config();

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// moment.js is a handy library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
exports.moment = require('moment');

// Some details about the site
exports.siteName = process.env.SITE_NAME ? process.env.SITE_NAME : 'Hooligan Server';

exports.positionOptions = ['Forward', 'Defender', 'Midfielder', 'Goalkeeper', 'Head Coach', 'Assistant Coach', 'Goalkeeper Coach', 'Technical Director', 'Associate Head Coach'];
