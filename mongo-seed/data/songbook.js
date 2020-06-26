const faker = require('faker');
const mongoose = require('mongoose');
const Songbook = mongoose.model('songbook');
const Song = mongoose.model('song');

async function createSongbook() {
    const songs = await Song.find({});
    let songsArray = [];
    songs.map((song) => {
        songsArray.push({
            _id: song._id,
            hint: song.title
        })
    })
    await Songbook.create({
        songbook_title: faker.lorem.words(faker.random.number({ min: 1, max: 3 })),
        organization: faker.lorem.word(),
        description: faker.lorem.paragraph(),
        chapters: [
            {
                chapter_title: faker.lorem.words(faker.random.number({ min: 1, max: 3 })),
                songs: songsArray
            }
        ]
    })
    console.log('Songbook seeded...');
}

module.exports = createSongbook
