var PushTokens = require('../models/pushTokens');
var PushTokenSchema = require('../models/schemas/pushTokenSchema');
var bodyParser = require('body-parser');
var Validator = require('express-validator');
var mongoose = require('mongoose');

module.exports = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  // returns all push tokens
  app.get('/api/pushToken', (req, res) => {
  PushTokens.find((error, pushTokens) => {
      if (error) {
        res.status(501).send({error});
      }
      res.send(pushTokens);
    });
  });

  // creates new push token
  app.post('/api/pushToken', (req, res) => {
    var newToken = PushTokens(req.body);
    validatePushTokenExists(newToken).then(function (valid) {
      if (!valid) {
        console.log('token is new');
        newToken.save((error, pushToken) => {
          error
            ? res
              .status(501)
              .send({error})
            : res.send(pushToken);
        });
      }
    })
  });

  //validates that a push token doesn't already exist in database
  function validatePushTokenExists(newPushToken) {
    console.log('pushToken in method: ' + newPushToken);
    return PushTokens.findOne({ pushToken: newPushToken }).then(function (result) {
      return result !== null;
    })
  }
};
