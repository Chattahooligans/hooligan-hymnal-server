const csurf = require('csurf');

module.exports.csrfProtection = csurf({ cookie: true })
