let Notifications = require("../models/notifications");
let PushHandler = require("../models/pushHandler");
const passport = require("passport");
const permissions = require("../middleware/PermissionsMiddleware");

module.exports = app => {
  // // Return something for bare URL just so we can be sure the server is running
  // app.get("/", (req, res) => {
  //   res.send("Chattahooligans API is running");
  // });

  // returns most recent notification
  app.get("/api/notifications/last", (req, res) => {
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
  app.get("/api/notifications", (req, res) => {
    Notifications.find((error, notifications) => {
      if (error) {
        res.status(501).send({ error });
      }
      res.send(notifications);
    });
  });

  // returns single notification by _id
  app.get("/api/notification/:id", (req, res) => {
    Notifications.findById(req.params.id, (error, notification) => {
      res.send(notification);
    });
  });

  // creates new notification and sends it as a push to all registered devices
  app.post(
    "/api/notification",
    passport.authenticate("jwt", { session: false }),
    permissions("pushNotificationsAllowed"),
    (req, res) => {
      console.log("entering post for notification push");
      console.log(req.body);
      var newNotification = Notifications(req.body);
      console.log("retrieved notification from body");
      newNotification.save((error, notification) => {
        if (error) {
          console.log("error: ", error);
          res
            .status(501)
            .send({ error: `Error saving notification: ${error}` });
        } else if (notification.push) {
          console.log("no error, pushing forward");
          //send push
          PushHandler.sendNotification(notification)
          .then(function(results) {
            results.notification = notification;
            res.send(results);
          }).catch(function(error) {
            //TODO: returning an error would be cleaner
            console.log("error 2: ", error);
            res
              .status(501)
              .send({ error: `Error fetching push tokens: ${error}` });
            return;
          });
        } else {
          //no push notification
          res.send(notification);
        }
      });
    }
  );

  // updates notification
  app.put(
    "/api/notification/:id",
    passport.authenticate("jwt", { session: false }),
    permissions("pushNotificationsAllowed"),
    (req, res) => {
      Notifications.findByIdAndUpdate(
        req.params.id,
        req.body,
        (error, notification) => {
          error ? res.status(501).send({ error }) : res.send(notification);
        }
      );
    }
  );

  // deletes notification
  app.delete(
    "/api/notification/:id",
    passport.authenticate("jwt", { session: false }),
    permissions("pushNotificationsAllowed"),
    (req, res) => {
      Notifications.findByIdAndRemove(req.params.id, error => {
        error
          ? res.status(501).send({ error })
          : res.send({ message: "Deleted" + req.params.id });
      });
    }
  );
};
