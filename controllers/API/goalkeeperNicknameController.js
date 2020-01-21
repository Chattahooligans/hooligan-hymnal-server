const {Expo} = require("expo-server-sdk");
const mongoose = require("mongoose");
const GoalkeeperNickname = mongoose.model("goalkeeperNickname");
const PushTokens = mongoose.model("pushTokens");
let config = require("../../config.js");
let expo = new Expo();

// var goalkeepers_nickname_cache = {
//   data: null,
//   last_refresh: 0,
//   force_reload: function(res) {
//     var that = this;
//     GoalkeeperNickname.find((error, goalkeeperNicknames) => {
//       if (error) {
//         that.data = null;
//         that.last_refresh = 0;
//         if (res != null) res.send(error);
//       }
//       that.data = goalkeeperNicknames;
//       that.last_refresh = Date.now();
//       if (res != null) res.send(that.data);
//     });
//   },
//   send_data: function(res) {
//     if (this.last_refresh + config.cache_timeout < Date.now()) {
//       this.force_reload(res);
//     } else {
//       res.send(this.data);
//     }
//   }
// };

var goalkeepers_nickname_cache = {
	data: null,
	last_refresh: 0,
	force_reload: async function(res) {
		var that = this;
		const goalkeeperNicknames = await GoalkeeperNickname.find();
		that.data = goalkeeperNicknames;
		that.last_refresh = Date.now();
		res.send(that.data);
	},
	send_data: async function(res) {
		if (this.last_refresh + config.cache_timeout < Date.now()) {
			this.force_reload(res);
		} else {
			res.send(this.data);
		}
	}
};

exports.last = async (req, res) => {
	const goalkeeperNickname = await GoalkeeperNickname.find()
		.sort({
			createAt: -1
		})
		.limit(1);
	res.json(goalkeeperNickname[0]);
};

exports.index = async (req, res) => {
	await goalkeepers_nickname_cache.send_data(res);
};

// module.exports = app => {
//   // app.use(
//   //   passport.authenticate("jwt", { session: false }),
//   //   permissions("foesAllowed")
//   // );

//   // returns most recent goalkeeper nickname
//   app.get("/api/goalkeeperNicknames/last", (req, res) => {
//     GoalkeeperNickname.find()
//       .sort({ createdAt: -1 })
//       .limit(1)
//       .then(goalkeeperNicknames => {
//         if (goalkeeperNicknames.length) {
//           res.send(goalkeeperNicknames[0]);
//         } else {
//           res.status(204).send();
//         }
//       });
//   });

//   // returns goalkeeperNickname
//   app.get(
//     "/api/goalkeeperNicknames",
//     // passport.authenticate('jwt', { session: false }),
//     (req, res) => {
//       goalkeepers_nickname_cache.send_data(res);
//       // GoalkeeperNickname.find((error, goalkeeperNickname) => {
//       //   if (error) {
//       //     res.status(501).send({ error });
//       //   }
//       //   res.send(goalkeeperNickname);
//       // });
//     }
//   );

//   // creates goalkeeperNickname
//   app.post(
//     "/api/goalkeeperNicknames",
//     passport.authenticate("jwt", { session: false }),
//     (req, res) => {
//       // console.log('entering post for gk nickname push');
//       var newGoalkeeperNickname = GoalkeeperNickname(req.body);
//       newGoalkeeperNickname.save((error, gkMessage) => {
//         if (error) {
//           console.log("error: ", error);
//           res
//             .status(501)
//             .send({ error: `Error saving notification: ${error}` });
//         } else if (gkMessage.push) {
//           console.log("no error, pushing forward");
//           PushTokens.find(async (error, tokens) => {
//             if (error) {
//               console.log("error 2: ", error);
//               res
//                 .status(501)
//                 .send({ error: `Error fetching push tokens: ${error}` });
//               return;
//             }

//             let errors = [];
//             let receipts = [];
//             let chunks = expo.chunkPushNotifications(tokens);
//             for (chunk of chunks) {
//               let notifications = chunk.map(token => {
//                 console.log(
//                   "trying to send notification to token: ",
//                   token.pushToken
//                 );
//                 return {
//                   to: token.pushToken,
//                   sound: "default",
//                   title: "We\u2019re gonna score on you...",
//                   body: "🖐 " + gkMessage.nickname
//                 };
//               });
//               try {
//                 console.log("trying to push");
//                 receipts.push(
//                   ...(await expo.sendPushNotificationsAsync(notifications))
//                 );
//               } catch (error) {
//                 console.log("there was a problem with the push");
//                 let tokenString = chunk
//                   .map(token => token.pushToken)
//                   .join(", ");
//                 console.error(
//                   `Error notifying with tokens [${tokenString}]: ${error}`
//                 );
//                 errors.push(
//                   ...chunk.map(
//                     token => `Error notifying with token ${token}: ${error}`
//                   )
//                 );
//               }
//             }
//             res.send({
//               errors: errors,
//               receipts: receipts,
//               gkMessage: gkMessage
//             });
//           });
//         } else {
//           //no push notification
//           res.send(gkMessage);
//         }
//       });
//     }
//   );
// };
