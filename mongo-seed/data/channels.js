const faker = require('faker');
const mongoose = require('mongoose');
const Channel = mongoose.model('channels');
const Users = mongoose.model('User')

async function createChannel() {
    const user = await Users.find({});
    await Channel.create({
        name: faker.lorem.words(faker.random.number({ min: 1, max: 3 })),
        defaultLocale: "en",
        description: faker.lorem.sentence(),
        follow: true,
        active: true,
        users: [
            {
                name: user[0].name,
                _id: user[0]._id,
                "canCreate": true,
                "canEdit": true,
                "canDelete": true,
                "canPush": true
            }
        ]
    })
    console.log('Channels seeded...');
}

module.exports = createChannel
