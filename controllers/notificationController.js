var Expo = require('expo-server-sdk');

var Notifications = require('../models/notifications');
var PushTokens = require('../models/pushTokens');
var bodyParser = require('body-parser');
let expo = new Expo();

module.exports = app => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  // Return something for bare URL just so we can be sure the server is running
  app.get('/', (req, res) => {
    res.send('Chattahooligans API is running');
  });

  // returns most recent notification
  app.get('/api/notifications/last', (req, res) => {
    Notifications.find()
      .sort({ send_time: -1 })
      .limit(1)
      .then(notifications => {
        if (notifications.length) {
          res.send(notifications[0]);
        } else {
          res.status(204).send();
        }
      });
  });

  // returns all notifications
  app.get('/api/notifications', (req, res) => {
    Notifications.find((error, notifications) => {
      if (error) {
        res.status(501).send({ error });
      }
      res.send(notifications);
    });
  });

  // returns single notification by _id
  app.get('/api/notification/:id', (req, res) => {
    Notifications.findById(
      req.params.id,
      'title lyrics',
      (error, notification) => {
        res.send(notification);
      }
    );
  });

  // creates notification
  app.post('/api/notification', (req, res) => {
    var newNotification = Notifications(req.body);
    newNotification.save((error, notification) => {
      if (error) {
        res.status(501).send({ error });
      } else {
        res.send(notification);
        console.log('notification: ' + notification);
        getTokens().array.forEach(element => {
          console.log('forEach: ' + element);
          try {
            async() => {
              let receipts = await expo.sendPushNotificationsAsync([
                {
                  to: element.pushToken,
                  sound: 'default',
                  body: notification.song.title,
                  data : notification.song._id
                }
              ]);
              res.json({receipts});
              console.log('notification sent to devices')
            }
            console.log('notification sent? idk');
          } catch (error) {
            console.error(error);
          }
        });
        /*
        for (var token in getTokens()) {
          console.log('token: ' + token.pushToken);
          try {
            async () => {
              let receipts = await expo.sendPushNotificationsAsync([
                {
                  to: token.pushToken,
                  sound: 'default',
                  body: newNotification.song.title,
                  data: newNotification.song._id
                }
              ]);
              res.json({ receipts });
              console.log('notification sent to devices')
            }  
            console.log('notification sent? idk');
          } catch (error) {
            console.error(error);
          }
        }  */
      }
    });
  });

  // updates notification
  app.put('/api/notification/:id', (req, res) => {
    Notifications.findByIdAndUpdate(
      req.params.id,
      req.body,
      (error, notification) => {
        error ? res.status(501).send({ error }) : res.send(notification);
      }
    );
  });

  app.delete('/api/notification/:id', (req, res) => {
    Notifications.findByIdAndRemove(req.params.id, error => {
      error
        ? res.status(501).send({ error })
        : res.send({ message: 'Deleted' + req.params.id });
    });
  });
};

// returns all tokens for sending notifications
function getTokens() {
  return PushTokens.find((error, tokens) => {
    if (error) {
      console.log('getTokens failed');
      return error;
    }
    else {
      console.log('getTokens log' + tokens);
      return tokens;
    }
  });
}