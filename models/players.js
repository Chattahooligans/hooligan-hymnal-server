const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const playersSchema = require('./schemas/playersSchema');

const { removeFromCloudinary } = require('../handlers/cloudinaryDelete');

playersSchema.pre('remove', async function (next) {
  await removeFromCloudinary('players_thumbnails', this.thumbnail);
  for (const image of this.images) {
    await removeFromCloudinary('players_images', image);
  }
  next();
});

playersSchema.post("findOne", function (res) {
    if (res == null) {
        const err = new Error("Player not found");
        err.status = 404;
        throw err;
    }
})

module.exports = mongoose.model('players', playersSchema);
