const faker = require('faker');
// require('../../db');
const mongoose = require('mongoose');
const Player = mongoose.model('players');
const { positionOptions } = require('../../helpers')

async function createPlayers() {
    for (let i = 0; i < 5; i++) {
        await Player.create({
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            squadNumber: faker.random.number({ min: 0, max: 99 }),
            position: faker.random.arrayElement(positionOptions),
            team: faker.lorem.words(faker.random.number({ min: 1, max: 3 })),
        })
    }
    console.log('Players have been seeded.')
}

module.exports = createPlayers
