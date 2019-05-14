var GoalkeeperNickname = require("../models/goalkeeperNickname");
var bodyParser = require("body-parser");

module.exports = app => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  // returns most recent goalkeeper nickname
  app.get('/api/goalkeeperNicknames/last', (req, res) => {
    GoalkeeperNickname.find()
      .sort({ createdAt: -1 })
      .limit(1)
      .then(goalkeeperNicknames => {
        if (goalkeeperNicknames.length) {
          res.send(goalkeeperNicknames[0]);
        } else {
          res.status(204).send();
        }
      });
  });

  // returns goalkeeperNickname
  app.get("/api/goalkeeperNicknames", (req, res) => {
    GoalkeeperNickname.find((error, goalkeeperNickname) => {
      if (error) {
        res.status(501).send({error});
      }
      res.send(goalkeeperNickname);
    });
  });

  // creates goalkeeperNickname
  app.post("/api/goalkeeperNicknames", (req, res) => {
    var newGoalkeeperNickname = GoalkeeperNickname(req.body);
    newGoalkeeperNickname.save((error, gkMessage) => {
      if (error) {
        console.log("error: ", error);
        res.status(501).send({ error: `Error saving notification: ${error}` });
      } else if (gkMessage.push) {
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
                'title': "We're gonna score on you...",
                'body': '🖐 ' + gkMessage.nickname
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
          res.send({ 'errors': errors, 'receipts': receipts, 'gkMessage': gkMessage});
        });
      } else {
        //no push notification
        res.send(gkMessage);
      }
    });
  });
};
