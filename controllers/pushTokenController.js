var PushTokens = require('../models/pushTokens');
var bodyParser = require('body-parser');

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
    newToken.save((error, token) => {
      error
        ? res
          .status(501)
          .send({error})
        : res.send(token);
    });
  });
};
