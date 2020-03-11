const jwt = require('jsonwebtoken');
const passport = require('passport');

const generateToken = (payload, key, expires) => jwt.sign(payload, key, {
  expiresIn: expires,
});

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ message: 'Incorrect email or password' });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      const payload = {
        id: user._id,
      };
      const secretOrKey = process.env.SECRET_KEY;
      const tokenExpires = process.env.TOKEN_EXPIRES ? `${process.env.TOKEN_EXPIRES}` : '1h';
      const refreshExpires = process.env.REFRESH_TOKEN_EXPIRES ? `${process.env.REFRESH_TOKEN_EXPIRES}` : '1d';
      let token = generateToken(payload, secretOrKey, tokenExpires);
      user = {
        id: user._id,
        email: user.email,
        foesAllowed: user.foesAllowed,
        pushNotificationsAllowed: user.pushNotificationsAllowed,
        rosterAllowed: user.rosterAllowed,
        songbookAllowed: user.songbookAllowed,
        usersAllowed: user.usersAllowed,
        feedAllowed: user.feedAllowed,
      };
      if (req.body.rememberMe) {
        token = generateToken(payload, secretOrKey, refreshExpires);
      }
      return res.json({
        token,
        user,
      });
    });
  })(req, res, next);
};

exports.me = (req, res) => {
  const {
    email,
    name,
    familyName,
    foesAllowed,
    feedAllowed,
    songbookAllowed,
    rosterAllowed,
    pushNotificationsAllowed,
    usersAllowed,
  } = req.user;
  res.json({
    user: {
      email,
      name,
      familyName,
      foesAllowed,
      feedAllowed,
      songbookAllowed,
      rosterAllowed,
      pushNotificationsAllowed,
      usersAllowed,
    },
  });
};
