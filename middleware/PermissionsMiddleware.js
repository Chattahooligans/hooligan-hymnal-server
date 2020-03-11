exports.apiCheckPermission = (option) => (req, res, next) => {
  const { user } = req;
  if (user && option in user) {
    if (user[option]) {
      return next();
    }
    return res.send({ message: 'You do not have the correct permissions' });
  }
};

exports.checkPermission = (option) => (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    return next();
  }
  if (req.user[option]) {
    return next();
  }
  req.flash('info', `You do not have the correct rights to view ${req.path}`);
  return res.redirect('/');
};
