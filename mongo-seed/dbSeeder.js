const mongoose = require('mongoose');
const Players = mongoose.model('players');
const Songs = mongoose.model('song');
const FeedItems = mongoose.model('feedItem');
const Songbooks = mongoose.model('songbook');
const Roster = mongoose.model('roster');
const Foes = mongoose.model('foes');
const Channel = mongoose.model('channels');

async function seedDB() {
  const playersPromise = Players.find({});
  const rosterPromise = Roster.find({})
  const songsPromise = Songs.find({});
  const songbooksPromise = Songbooks.find({});
  const foesPromise = Foes.find({});
  const channelsPromise = Channel.find({});
  const feedItemsPromise = FeedItems.find({});

  const [
      players,
      rosters,
      songs,
      songbooks,
      foes,
      channels,
      feedItems
  ] = await Promise.all([
      playersPromise,
      rosterPromise,
      songsPromise,
      songbooksPromise,
      foesPromise,
      channelsPromise,
      feedItemsPromise
  ])


  if (players.length === 0) {
    const createPlayers = require('./data/players');
    await createPlayers();
  }

  if (songs.length === 0) {
    const createSongs = require('./data/songs')
    await createSongs();
  }

  if (songbooks.length === 0) {
    const createSongbook = require('./data/songbook')
    await createSongbook();
  }

  if (rosters.length === 0) {
      const createRoster = require('./data/rosters')
      await createRoster();
  }

  if (foes.length === 0) {
      const createFoes = require('./data/foes');
      await createFoes();
  }

  if (channels.length === 0) {
      const createChannel = require('./data/channels');
      await createChannel();
  }

  if (feedItems.length === 0) {
      const createFeedItems = require('./data/feedItems')
      await createFeedItems();
  }
}

module.exports = seedDB
