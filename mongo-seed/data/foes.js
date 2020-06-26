const faker = require('faker')
const mongoose = require('mongoose')
const Foes = mongoose.model('foes')
const { positionOptions } = require('../../helpers')

async function createFoes() {
    let foePlayers = [];
    for (let j = 0; j < 5; j++) {
        foePlayers.push({
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            squadNumber: faker.random.number({ min: 1, max: 99 }),
            postion: faker.random.arrayElement(positionOptions)
        })
    }
    for (let i = 0; i < 5; i++) {
        await Foes.create({
            opponent: faker.lorem.words(faker.random.number({ min: 1, max: 3 })),
            competition: `Competition`,
            backgroundColor: `#${faker.helpers.replaceSymbolWithNumber('######')}`,
            accentColor: `#${faker.helpers.replaceSymbolWithNumber('######')}`,
            textColor: `#${faker.helpers.replaceSymbolWithNumber('######')}`,
            season: `Season ${faker.random.number({min: 1900, max: 3000})}`,
            active: faker.random.boolean(),
            players: foePlayers
        })
    }
    console.log('Foes seeded...')
}

module.exports = createFoes
