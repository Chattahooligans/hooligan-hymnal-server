const passport = require('passport');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated() || process.env.NODE_ENV === 'test') {
    return next();
  }
  req.session.redirectTo = req.path;
  return res.redirect(`/login?nextUrl=${req.session.redirectTo}`);
};

exports.apiLoggedIn = passport.authenticate('jwt', { session: false });
