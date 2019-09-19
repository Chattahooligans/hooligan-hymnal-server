var Users = require('../models/users');
var UserCredentials = require('../models/userCredentials');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var Cookies = require('cookies');
const uuidv4 = require('uuid/v4');
const saltRounds = 10;
const keys = ["TEST DON'T USE THIS"];

module.exports = app => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  app.post('/api/users/register', (req, res) => {
    var userCredentials = UserCredentials(req.body);
    bcrypt.hash(userCredentials.password, saltRounds, function(err, hash) {
      if(err) {
        res.status(500).send({message: "Failed to create password hash"});
        return;
      }
      var newUser = Users({
        email: userCredentials.email,
        hash: hash,
        pushNotificationsAllowed: false,
        rosterAllowed: false,
        songbookAllowed: false,
        foesAllowed: false,
      });
      newUser.save((error, notification) => {
        if(error) {
          res.status(500).send({message: "Failed to save user to Mongo"});
          console.log(hash);
        } else {
          res.send({message: "User saved"});
        }
      });
    });
  });

  // logs the user in and returns a cookie
  app.post('/api/users/login', (req, res) => {

    var userCredentials = UserCredentials(req.body);
    Users.findOne({email: userCredentials.email}, (error, user) => {
      bcrypt.compare(userCredentials.password, user.hash, function(err, result) {
        if(result && !err) {
          //success, return a cookie
          //TODO: save sessionKey into session store
          //TODO: set a random key in the database or heroku vars
          var cookies = new Cookies(req, res, { keys: keys });
          var sessionKey = uuidv4();
          cookies.set('SessionKey', sessionKey, { signed: true });
          res.send("sessionKey " + sessionKey);
        } else {
          //failure, return failure
          res.status(401).send({message: "Bad Username/Password"});
        }
      });
    });
  });

  // updates user
  app.put('/api/users/:id', (req, res) => {
    return;
    //validate cookie
    Users.findByIdAndUpdate(
      req.params.id,
      req.body,
      (error, notification) => {
        error ? res.status(501).send({ error }) : res.send(notification);
      }
    );
  });

  // deletes notification
  app.delete('/api/users/:id', (req, res) => {
    return;
    //validate cookie
    Users.findByIdAndRemove(req.params.id, error => {
      error
        ? res.status(501).send({ error })
        : res.send({ message: 'Deleted' + req.params.id });
    });
  });
};