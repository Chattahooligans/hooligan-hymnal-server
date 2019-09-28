var Cookies = require("cookies");
var Sessions = require("../models/sessions");
var Users = require("../models/users");

module.exports.userCanEditRoster = function(user, req, res, callback) {
  return user.rosterAllowed;
  // getUser(req, res, (user) => {
  //     if(user == null) {
  //         callback(false);
  //         return;
  //     }
  //     callback(user.rosterAllowed);
  // });
};

module.exports.userCanPushNotification = function(req, res, callback) {
  getUser(req, res, user => {
    if (user == null) {
      callback(false);
      return;
    }
    callback(user.pushNotificationsAllowed);
  });
};

module.exports.userCanEditSongbook = req = req => {
  //   const { user } = req;
};

module.exports.userCanEditFoes = function(req, res, callback) {
  getUser(req, res, user => {
    if (user == null) {
      callback(false);
      return;
    }
    callback(user.foesAllowed);
  });
};

// function getUser(req, res, callback) {
//   var cookies = new Cookies(req, res, { keys: [process.env.COOKIE_KEY] });
//   var sessionKey = cookies.get("SessionKey", { signed: true });
//   Sessions.findOne({ sessionKey: sessionKey }, (error, session) => {
//     if (error || session == null) {
//       callback(null);
//       return;
//     }
//     //null implies no timeout
//     if (session.expiresOn == null || session.expiresOn < new Date()) {
//       callback(null);
//       return;
//     }
//     Users.findOne({ email: session.email }, (err, user) => {
//       if (err) {
//         callback(null);
//         return;
//       }
//       callback(user);
//     });
//   });
// }
