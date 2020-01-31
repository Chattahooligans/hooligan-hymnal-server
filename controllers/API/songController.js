const mongoose = require("mongoose");
const Songs = mongoose.model("song");
const Players = mongoose.model("players");
const config = require("../../config.js");

const song_cache = {
	data: null,
	last_refresh: 0,
	force_reload: async function(res) {
		const that = this;
		const songs = await Songs.find();
		if (!songs.length) {
			that.data = null;
			that.last_refresh = 0;
			res.json(that.data);
			return;
		}
		that.data = songs;
		that.last_refresh = Date.now();
		res.json(that.data);
	},
	send_data: async function(res) {
		if (this.last_refresh + config.cache_timeout < Date.now()) {
			await this.force_reload(res);
		} else {
			res.json(this.data);
		}
	}
};

exports.index = async (req, res) => {
	await song_cache.send_data(res);
};

exports.show = async (req, res) => {
	let song = await Songs.findById(req.params.id);
	if (song.playerId) {
		const player = await Players.findById(song.playerId);
		song.player = player;
	}
	res.json(song);
};

// module.exports = app => {
//   // returns all songs
//   app.get("/api/songs", (req, res) => {
//     song_cache.send_data(res);
//   });

//   // returns single song by _id
//   app.get("/api/song/:id", (req, res) => {
//     Songs.findById(req.params.id, (error, song) => {
//       res.send(song);
//     });
//   });

//   // creates song
//   app.post(
//     "/api/song",
//     passport.authenticate("jwt", { session: false }),
//     apiCheckPermission("songbookAllowed"),
//     (req, res) => {
//       var newSong = Songs(req.body);
//       newSong.save((error, song) => {
//         error ? res.status(501).send({ error }) : res.send(song);
//         song_cache.force_reload();
//       });
//     }
//   );

//   // updates song
//   app.put(
//     "/api/song/:id",
//     passport.authenticate("jwt", { session: false }),
//     apiCheckPermission("songbookAllowed"),
//     (req, res) => {
//       Songs.findByIdAndUpdate(req.params.id, req.body, (error, song) => {
//         error ? res.status(501).send({ error }) : res.send(song);
//         song_cache.force_reload();
//       });
//     }
//   );

//   // deletes song
//   app.delete(
//     "/api/song/:id",
//     passport.authenticate("jwt", { session: false }),
//     apiCheckPermission("songbookAllowed"),
//     (req, res) => {
//       Songs.findByIdAndRemove(req.params.id, error => {
//         error
//           ? res.status(501).send({ error })
//           : res.send({ message: "Deleted" + req.params.id });
//         song_cache.force_reload();
//       });
//     }
//   );
// };
