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
    
    validate(newToken, function (err, validator) {
      if (!err) {
        console.log('token is new');
        newToken.save((error, pushToken) => {
          error
            ? res
              .status(501)
              .send({error})
            : res.send(pushToken);
        });
      } else {
        console.log('token isnt new');
      }
    })
  });

  //checks for push token
  function check(data, callback) {
    mongoose.model('PushToken', PushTokens).count(data, function(err, count){
      callback(err, !! count);
    });
    console.log('leaving check()')
  };

  //validates push token
  function validate(newPushToken, callback) {
    var v = new ValidationError(), errors = new Array();

    v.error = function (msg) {
      errors.push(msg);
    };

    check({ pushToken: newPushToken }, function (err, exists) {
      if (err) {
        return callback(err);
      }

      v.check(exists, { pushToken: 'pushToken already exists' }).equals(false);
      callback(null, v);
    });
    console.log('leaving validate');
  }
};
