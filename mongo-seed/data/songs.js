const faker = require('faker')
const mongoose = require('mongoose')
const Songs = mongoose.model('song');

async function createSongs() {
    for (let i = 0; i < 5; i++) {
        const title = faker.lorem.words(faker.random.number({ min: 1, max: 3 }))
        await Songs.create({
            title: title,
            category: faker.lorem.word(),
            instructions: faker.lorem.sentence(),
            lyrics: faker.lorem.paragraphs(faker.random.number({ min: 1, max: 5 })),
            referenceTitle: title,
            referenceLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            sheetMusicLink: faker.internet.url(),
            legend: faker.lorem.words(faker.random.number({ min: 1, max: 3 })),
            capoSignal: faker.lorem.word()
        })
    }
    console.log('Songs seeded...');
}

module.exports = createSongs
