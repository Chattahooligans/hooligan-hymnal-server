var Users = require("../models/users");
var UserCredentials = require("../models/userCredentials");
var Sessions = require("../models/sessions");
var Permissions = require("../models/permissions");
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt");
var Cookies = require("cookies");
const uuidv4 = require("uuid/v4");
const saltRounds = 10;

module.exports = app => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  app.post("/api/users/register", (req, res) => {
    var userCredentials = UserCredentials(req.body);
    bcrypt.hash(userCredentials.password, saltRounds, function(err, hash) {
      if (err) {
        res.status(500).send({ message: "Failed to create password hash" });
        return;
      }
      var newUser = Users({
        email: userCredentials.email,
        hash: hash,
        pushNotificationsAllowed: false,
        rosterAllowed: false,
        songbookAllowed: false,
        foesAllowed: false
      });
      newUser.save((error, notification) => {
        if (error) {
          res.status(500).send({ message: "Failed to save user to Mongo" });
          console.log(hash);
        } else {
          res.send({ message: "User saved" });
        }
      });
    });
  });

  // logs the user in and returns a cookie
  app.post("/api/users/login", (req, res) => {
    if (req.headers.cookie) {
      const { cookie } = req.headers;
      const sessionId = cookie.split("; ")[0].replace("SessionKey=", "");
      Sessions.findOne({ sessionKey: sessionId }, (error, session) => {
        if (session) {
          return res.status(200).send({ message: "You are already logged in" });
        }
      });
    }
    var userCredentials = UserCredentials(req.body);
    Users.findOne({ email: userCredentials.email }, (error, user) => {
      bcrypt.compare(userCredentials.password, user.hash, function(
        err,
        result
      ) {
        if (result && !err) {
          //success, return a cookie
          var cookies = new Cookies(req, res, {
            keys: [process.env.COOKIE_KEY]
          });
          var sessionKey = uuidv4();
          let date = new Date();
          date.setDate(date.getDate() + 2);
          date.toUTCString();
          cookies.set("SessionKey", sessionKey, {
            signed: true,
            expires: date
          });
          var session = Sessions();
          session.email = user.email;
          session.sessionKey = sessionKey;
          //token expires one year from now. Encourages complex-enough passwords
          //while still logging people out as phones die, people leave, etc
          session.expiresOn = new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          );
          session.save();
          res.send("sessionKey " + sessionKey);
        } else {
          //failure, return failure
          res.status(401).send({ message: "Bad Username/Password" });
        }
      });
    });
  });

  app.get("/api/users/me", (req, res) => {
    const { cookie } = req.headers;
    if (!cookie) {
      return false;
    }
    const sessionId = cookie.split("; ")[0].replace("SessionKey=", "");
    const sessionQuery = Sessions.findOne({ sessionKey: sessionId }).select(
      "email"
    );
    sessionQuery.exec((error, session) => {
      if (error || session === null) {
        res
          .status(401)
          .send({ message: "No session found, please log back in" });
        return;
      }
      Users.findOne({ email: session.email }, (err, user) => {
        if (err) {
          res.status(401).send({
            message: "No user found with that requested email address"
          });
          return;
        }
        res.send({
          _id: user.id,
          email: user.email,
          pushNotificationsAllowed: user.pushNotificationsAllowed,
          rosterAllowed: user.rosterAllowed,
          songbookAllowed: user.songbookAllowed,
          foesAllowed: user.foesAllowed
        });
      });
    });
    return true;
  });

  app.post("/api/users/logout", (req, res) => {
    if (req.headers.cookie) {
      const { cookie } = req.headers;
      const sessionId = cookie.split("; ")[0].replace("SessionKey=", "");
      Sessions.findOneAndRemove({ sessionKey: sessionId }, (err, session) => {
        if (!err) {
          // console.log(res.clearCookie("SessionKey", { path: '/', keys: [process.env.COOKIE_KEY] }))
          // TODO: delete cookies here
          return res.sendStatus(200);
        }
        res.send(err);
      });
    }
  });

  app.post("api/users/testcookie", (req, res) => {
    var cookies = new Cookies(req, res, { keys: keys });
    console.log(cookies.get("SessionKey", { signed: true }));
  });

  // updates user
  app.put("/api/users/:id", (req, res) => {
    //not implemented yet, use nosqlbooster for now
    return;
    //validate cookie
    Users.findByIdAndUpdate(req.params.id, req.body, (error, notification) => {
      error ? res.status(501).send({ error }) : res.send(notification);
    });
  });

  // deletes user
  app.delete("/api/users/:id", (req, res) => {
    //not implemented yet, use nosqlbooster for now
    return;
    //validate cookie
    Users.findByIdAndRemove(req.params.id, error => {
      error
        ? res.status(501).send({ error })
        : res.send({ message: "Deleted" + req.params.id });
    });
  });
};
