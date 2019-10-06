const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcrypt");
const passport = require("passport");

// Might need to implement a redis setup eventually...
let tokenList = {};

module.exports = app => {
  app.post("/api/users/register", async (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({
      email,
      password
    });

    await User.createUser(newUser, (error, user) => {
      if (error) {
        res.status(422).json({
          message:
            "Something happened... please check that you don't already have an account otherwise try again later"
        });
      }
      res.json({ message: "User created please login" });
    });
  });

  app.post("/api/users/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, "+password", (err, user) => {
      if (!user) {
        return res.sendStatus(404).json({
          message: "User not found"
        });
      }
      if (password) {
        bcryptjs.compare(password, user.password, (err, isMatch) => {
          if (isMatch) {
            const payload = { id: user._id };
            const secretOrKey = process.env.SECRET_KEY;
            const tokenExpires = process.env.TOKEN_EXPIRES;
            const refreshSecretOrKey = process.env.REFRESH_SECRET_KEY;
            const refreshExpires = process.env.REFRESH_TOKEN_EXPIRES;
            const token = jwt.sign(payload, secretOrKey, {
              expiresIn: tokenExpires
            });
            const refreshToken = jwt.sign(payload, refreshSecretOrKey, {
              expiresIn: refreshExpires
            });
            user = {
              email: user.email,
              foesAllowed: user.foesAllowed,
              pushNotificationsAllowed: user.pushNotificationsAllowed,
              rosterAllowed: user.rosterAllowed,
              songbookAllowed: user.songbookAllowed,
              usersAllowed: user.usersAllowed
            }
            return res.status(200).send({ token, refreshToken, user });
          } else {
            return res.status(400).send({ message: "Something happened please make sure you have an account" });
          }
        });
      } else {
        return res.send(422).json({"message": "Password was incorrect or wasn't provided"})
      }
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
        pushNotificationsAllowed,
        usersAllowed
      } = req.user;
      res.json({
        user: {
          email,
          foesAllowed,
          songbookAllowed,
          rosterAllowed,
          pushNotificationsAllowed,
          usersAllowed
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

  app.get(
    "/api/users",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { email } = req.user;
      User.find({ email: { $ne: email } }, "email", (err, users) => {
        if (err) {
          res.json({ message: "Something happend" });
        }
        res.json(users);
      });
    }
  );

  app.post(
    "/api/users",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const {
        email,
        password,
        songbookAllowed,
        rosterAllowed,
        foesAllowed,
        usersAllowed,
        pushNotificationsAllowed
      } = req.body;
      const newUser = new User({
        email,
        password,
      });
      newUser.songbookAllowed = songbookAllowed;
      newUser.rosterAllowed = rosterAllowed;
      newUser.foesAllowed = foesAllowed;
      newUser.usersAllowed = usersAllowed;
      newUser.pushNotificationsAllowed = pushNotificationsAllowed;

      User.createUser(newUser, (error, user) => {
        if (error) {
          res.status(422).json({
            message: `Something happened... Please verify they don't already have an account: ${email}`
          });
        }
        User.findByIdAndUpdate(
          user.id,
          {
            ...user,
            songbookAllowed,
            rosterAllowed,
            foesAllowed,
            usersAllowed,
            pushNotificationsAllowed
          },
          (err, user) => {
            if (err) {
              res.status(422).json({ message: err });
            }
            res.json(user);
          }
        );
      });
    }
  );

  app.get(
    "/api/users/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { id } = req.params;
      User.findOne({ _id: id }, (err, user) => {
        if (!user) {
          res.status(404).send({ message: "User doesn't exist" });
        }
        res.json(user);
      });
    }
  );

  app.put(
    "/api/users/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { id } = req.params;
      User.findByIdAndUpdate(id, req.body, (error, user) => {
        if (error) {
          res.status(501).send({ error });
        }
        res.send(user);
      });
    }
  );

  app.delete(
    "/api/users/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { id } = req.params;
      User.findByIdAndRemove(id, error => {
        if (error) {
          res.status(501).send({ error });
        }
        res.send({ message: `Deleted: ${id}` });
      });
    }
  );
};
