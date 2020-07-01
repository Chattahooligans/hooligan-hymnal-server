const mongoose = require('mongoose');
const Players = mongoose.model('players');
const Songs = mongoose.model('song');
const FeedItems = mongoose.model('feedItem');
const Songbooks = mongoose.model('songbook');
const Roster = mongoose.model('roster');
const Foes = mongoose.model('foes');
const Channel = mongoose.model('channels');

const createPlayers = require('./data/players');
const createSongs = require('./data/songs');
const createSongbook = require('./data/songbook');
const createRoster = require('./data/rosters');
const createFoes = require('./data/foes');
const createChannel = require('./data/channels');
const createFeedItems = require('./data/feedItems')

async function seedDB() {
  const playersPromise = Players.countDocuments();
  const rosterPromise = Roster.countDocuments();
  const songsPromise = Songs.countDocuments();
  const songbooksPromise = Songbooks.countDocuments();
  const foesPromise = Foes.countDocuments();
  const channelsPromise = Channel.countDocuments();
  const feedItemsPromise = FeedItems.countDocuments();

  const [
      players,
      rosters,
      songs,
      songbooks,
      foes,
      channels,
      feedItems,
  ] = await Promise.all([
      playersPromise,
      rosterPromise,
      songsPromise,
      songbooksPromise,
      foesPromise,
      channelsPromise,
      feedItemsPromise,
  ]);


  if (players.length === 0) {
    await createPlayers();
  }

  if (songs.length === 0) {
    await createSongs();
  }

  if (songbooks.length === 0) {
    await createSongbook();
  }

  if (rosters.length === 0) {
      await createRoster();
  }

  if (foes.length === 0) {
      await createFoes();
  }

  if (channels.length === 0) {
      await createChannel();
  }

  if (feedItems.length === 0) {
      await createFeedItems();
  }
}

module.exports = seedDB;
