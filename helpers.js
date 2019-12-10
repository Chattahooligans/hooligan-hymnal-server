const fs = require("fs");

exports.dump = obj => JSON.stringify(obj, null, 2);
