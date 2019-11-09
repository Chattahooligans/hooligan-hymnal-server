const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcrypt");
const passport = require("passport");
const permissionsMiddleware = require("../middleware/PermissionsMiddleware");
const { check, validationResult } = require("express-validator");

// Might need to implement a redis setup eventually...
let tokenList = {};

module.exports = app => {
  app.post("/api/users/register", (req, res) => {
    let { email, password, name, familyName, displayName } = req.body;
    const newUser = new User({
      name,
      familyName,
      displayName,
      email,
      password
    });

    User.createUser(newUser, (error, user) => {
      if (error) {
        return res.status(422).json({
          message:
            "Something happened... please check that you don't already have an account otherwise try again later"
        });
      }
      return res.json({ message: "User created please login", user });
    });
  });

  app.post("/api/users/login", async (req, res) => {
    let { email, password, rememberMe } = req.body;
    email = email.toLowerCase();
    let loginTime = Date.now();
    let user = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          lastLogin: loginTime
        }
      }
    )
      .select("+password")
      .exec();
    if (!user) {
      return res.status(400).send({ message: "Something happend." });
    }
    if (password) {
      bcryptjs.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
          const payload = {
            id: user._id
          };
          const secretOrKey = process.env.SECRET_KEY;
          const tokenExpires = `${process.env.TOKEN_EXPIRES}` || "1h";
          const refreshSecretOrKey = process.env.REFRESH_SECRET_KEY;
          const refreshExpires = `${process.env.REFRESH_TOKEN_EXPIRES}` || "1d";
          let token = jwt.sign(payload, secretOrKey, {
            expiresIn: tokenExpires
          });
          const refreshToken = jwt.sign(payload, refreshSecretOrKey, {
            expiresIn: refreshExpires
          });
          user = {
            id: user.id,
            email: user.email,
            foesAllowed: user.foesAllowed,
            pushNotificationsAllowed: user.pushNotificationsAllowed,
            rosterAllowed: user.rosterAllowed,
            songbookAllowed: user.songbookAllowed,
            usersAllowed: user.usersAllowed
          };
          if (rememberMe) {
            token = refreshToken;
          }
          return res.status(200).send({
            token,
            user
          });
        } else {
          return res
            .status(400)
            .send({ message: "Incorrect Password. Please try again." });
        }
      });
    } else {
      return res
        .send(422)
        .json({ message: "Password was incorrect or wasn't provided" });
    }
  });

  app.get(
    "/api/users/me",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const {
        email,
        name,
        familyName,
        foesAllowed,
        songbookAllowed,
        rosterAllowed,
        pushNotificationsAllowed,
        usersAllowed
      } = req.user;
      res.json({
        user: {
          email,
          name,
          familyName,
          foesAllowed,
          songbookAllowed,
          rosterAllowed,
          pushNotificationsAllowed,
          usersAllowed
        }
      });
    }
  );

  // app.post("/api/users/refresh", (req, res) => {
  //   const { refreshToken } = req.body;
  //   if (refreshToken && refreshToken in tokenList) {
  //     const refToken = jwt.decode(refreshToken);
  //     User.findById(refToken.id, (err, user) => {
  //       if (user) {
  //         const payload = { id: user.id };
  //         const secretOrKey = process.env.SECRET_KEY || "NOTsoSECRETkey";
  //         const tokenExpires = process.env.TOKEN_EXPIRES || "1h";

  //         const token = jwt.sign(payload, secretOrKey, {
  //           expiresIn: tokenExpires
  //         });

  //         const response = {
  //           token: token
  //         };
  //         tokenList[refreshToken].token = token;
  //         res.status(200).json(response);
  //       }
  //     });
  //   } else {
  //     res.status(404).send("Invalid please log back in");
  //   }
  // });

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
    permissionsMiddleware("usersAllowed"),
    async (req, res) => {
      const { email } = req.user;
      const { role } = req.query;
      const users = User.find({}, "-__v +lastLogin").where({
        email: { $ne: email }
      });
      if (role) {
        users.where(role, true);
      }
      users.exec((err, users) => {
        if (err) {
          return res.json({ message: err });
        }
        return res.send(users);
      });
    }
  );

  app.post(
    "/api/users",
    passport.authenticate("jwt", { session: false }),
    permissionsMiddleware("usersAllowed"),
    (req, res) => {
      const {
        email,
        name,
        familyName,
        displayName,
        password,
        songbookAllowed,
        rosterAllowed,
        foesAllowed,
        usersAllowed,
        pushNotificationsAllowed
      } = req.body;
      const newUser = new User({
        email,
        name,
        familyName,
        displayName,
        password
      });
      newUser.songbookAllowed = songbookAllowed;
      newUser.rosterAllowed = rosterAllowed;
      newUser.foesAllowed = foesAllowed;
      newUser.usersAllowed = usersAllowed;
      newUser.pushNotificationsAllowed = pushNotificationsAllowed;

      User.createUser(newUser, (error, user) => {
        if (error) {
          return res.status(422).json({
            // error
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
              return res.status(422).json({ message: err });
            }
            return res.json(user);
          }
        );
      });
    }
  );

  app.get(
    "/api/users/:id",
    passport.authenticate("jwt", { session: false }),
    permissionsMiddleware("usersAllowed"),
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
    permissionsMiddleware("usersAllowed"),
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
    permissionsMiddleware("usersAllowed"),
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

  app.put(
    "/api/users/:id/reset-password",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { id } = req.user;
      const { password, newPassword } = req.body;
      User.findById(id, "+password", (err, user) => {
        if (err) {
          return res.send(err);
        }
        bcryptjs.compare(password, user.password, (err, isMatch) => {
          if (!isMatch) {
            return res.send(err);
          }
          bcryptjs.genSalt(10, (err, salt) => {
            if (err) {
              return res.send(err);
            }
            bcryptjs.hash(newPassword, salt, (err, hash) => {
              if (err) {
                return res.send(err);
              }
              user.passport = hash;
              user.save(res.send({ message: "Password succefully updated!" }));
            });
          });
        });
      });
    }
  );
};
