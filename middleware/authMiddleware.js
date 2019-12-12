exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.redirectTo = req.path;
  res.redirect(`/login?nextUrl=${req.session.redirectTo}`);
};
