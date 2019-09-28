const User = require("../models/users");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Might need to implement a redis setup eventually...
let tokenList = {};

module.exports = app => {
  app.post("/api/users/register", (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({
      email,
      password
    });

    User.createUser(newUser, (error, user) => {
      if (error) {
        res.staus(422).json({
          message:
            "Something happened... please check that you don't already have an account otherwise try again later"
        });
      }
      res.json({ message: "User created please login" });
    });
  });

  app.post("/api/users/login", (req, res) => {
    const { email, password } = req.body;
    User.getUserByEmail(email, (err, user) => {
      if (!user) {
        res.status(404).json({
          message: "User not found please register"
        });
      }
      User.comparePassword(password, user.password, (err, isMatch) => {
        if (isMatch) {
          const payload = { id: user.id };
          const secretOrKey = process.env.SECRET_KEY || "NOTsoSECRETkey";
          const tokenExpires = process.env.TOKEN_EXPIRES || "30m";
          const refreshSecretOrKey =
            process.env.REFRESH_SECRET_KEY || "NOTsoSECRETkey";
          const refreshTokenExpires = process.env.REFRESH_TOKEN_EXPIRES || "1d";
          const token = jwt.sign(payload, secretOrKey, {
            expiresIn: tokenExpires
          });
          const refreshToken = jwt.sign(payload, refreshSecretOrKey, {
            expiresIn: refreshTokenExpires
          });
          const response = {
            message: "Logged In",
            token: token,
            refreshToken: refreshToken
          };
          tokenList[refreshToken] = response;
          res.status(200).json(response);
        } else {
          res.status(401).json({ message: "The password is incorrect" });
        }
      });
    });
  });

  app.get(
    "/api/users/me",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const {
        email,
        foesAllowed,
        songbookAllowed,
        rosterAllowed,
        pushNotificationsAllowed
      } = req.user;
      res.json({
        user: {
          email,
          foesAllowed,
          songbookAllowed,
          rosterAllowed,
          pushNotificationsAllowed
        }
      });
    }
  );

  app.post("/api/users/refresh", (req, res) => {
    const { refreshToken } = req.body;
    if (refreshToken && refreshToken in tokenList) {
      const refToken = jwt.decode(refreshToken);
      User.findById(refToken.id, (err, user) => {
        if (user) {
          const payload = { id: user.id };
          const secretOrKey = process.env.SECRET_KEY || "NOTsoSECRETkey";
          const tokenExpires = process.env.TOKEN_EXPIRES || "30m";

          const token = jwt.sign(payload, secretOrKey, {
            expiresIn: tokenExpires
          });

          const response = {
            token: token
          };
          tokenList[refreshToken].token = token;
          res.status(200).json(response);
        }
      });
    } else {
      res.status(404).send("Invalid please log back in");
    }
  });

  app.post(
    "/api/users/logout",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      req.user = {};
      res.status(201).json({ message: "You have been logged out" });
    }
  );
};
