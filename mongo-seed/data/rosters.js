const faker = require('faker')
const mongoose = require('mongoose');
const Roster = mongoose.model('roster');
const Player = mongoose.model('players');

async function createRoster() {
    const players = await Player.find();
    let playersArray = [];
    players.map((player) => {
        playersArray.push({
            _id: player._id,
            hint: player.name
        })
    });
    await Roster.create({
        rosterTitle: faker.lorem.words(
            faker.random.number({ min: 1, max: 3 })
        ),
        season: `Season ${faker.random.number({ min: 1900, max: 3000 })}`,
        players: playersArray,
        active: true,
        default: true
    })
    console.log('Roster was seeded...')
}

module.exports = createRoster
