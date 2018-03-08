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
        res
          .status(501)
          .send({error});
      }
      res.send(pushTokens);
    });
  });

  // creates new push token
  app.post('/api/pushToken', (req, res) => {
    var now = new Date()
      .getTime()
      .toString();
    var tokenData = Object.assign({}, req.body, { lastUsed: now });

    PushTokens.findOneAndUpdate(
      { pushToken: tokenData.pushToken },
      tokenData,
      {
        // Return new token if updated (instead of original), create a new
        // record if none exists. There aren't any defaults in the push token
        // schema yet, but in case there ever are, setDefaultsOnInsert is
        // probably the behavior we'd want.
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      },
      (error, token) => {
        error
          ? res
              .status(501)
              .send({ error: `Error creating or updating push token ${tokenData.pushToken}: ${error}` })
          : res.send(token);
      }
    );
  });
};
