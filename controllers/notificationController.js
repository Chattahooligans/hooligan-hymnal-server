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
      (error, notification) => {
        res.send(notification);
      }
    );
  });

  // creates new notification and sends it as a push to all registered devices
  app.post('/api/notification', (req, res) => {
    console.log('entering post for notification push');
    var newNotification = Notifications(req.body);
    newNotification.save((error, notification) => {
      if (error) {
        console.log("error: ", error);
        res.status(501).send({ error: `Error saving notification: ${error}` });
      } else if (notification.push) {
        console.log('no error, pushing forward');
        PushTokens.find(async(error, tokens) => {
          if (error) {
            console.log('error 2: ', error);
            res.status(501).send({ 'error': `Error fetching push tokens: ${error}` });
            return;
          }

          let errors = [];
          let receipts = [];
          let chunks = expo.chunkPushNotifications(tokens);
          for (chunk of chunks) {
            let notifications = chunk.map(token => {
              console.log('trying to send notification to token: ', token.pushToken);
              return {
                'to': token.pushToken,
                'sound': 'default',
                'title': notification.song.title,
                'body': notification.song.lyrics,
                'data': { 'song': notification.song },
              };
            });
            try {
              console.log('trying to push');
              receipts.push(...await expo.sendPushNotificationsAsync(notifications));
            } catch (error) {
              console.log('there was a problem with the push');
              let tokenString = chunk.map(token => token.pushToken ).join(', ');
              console.error(`Error notifying with tokens [${tokenString}]: ${error}`);
              errors.push(...chunk.map(token => `Error notifying with token ${token}: ${error}` ));
            }
          };
          res.send({ 'errors': errors, 'receipts': receipts, 'notification': notification});
        });
      } else {
        //no push notification
        res.send(notification);
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

  // deletes notification
  app.delete('/api/notification/:id', (req, res) => {
    Notifications.findByIdAndRemove(req.params.id, error => {
      error
        ? res.status(501).send({ error })
        : res.send({ message: 'Deleted' + req.params.id });
    });
  });
};
