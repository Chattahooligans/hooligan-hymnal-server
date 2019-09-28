const User = require("../models/users");
const jwt = require("jsonwebtoken");
const passport = require("passport");

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
          const token = jwt.sign(payload, secretOrKey, {
            expiresIn: "2h"
          });
          res.json({ message: "Logged In", token });
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
      res.json({ user: req.user });
    }
  );

  app.post(
    "/api/users/logout",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.status(201).json({ message: "You have been logged out" });
    }
  );
};
