const faker = require('faker')
const mongoose = require('mongoose');
const FeedItems = mongoose.model('feedItem')
const Channels = mongoose.model('channels')
const Users = mongoose.model('User')

async function seedFeedItems() {
    console.log('Seed Feed Items')
    const channelsPromise = Channels.find();
    const usersPromise = Users.find();
    const [channels, users] = await Promise.all([channelsPromise, usersPromise]);
    for (let i = 0; i < 5; i++) {
        await FeedItems.create({
            sender: {
                user: users[0].id,
                pushToken: "IAMAFAKETOKEN!!!"
            },
            publishedAt: faker.date.recent(),
            push: faker.random.boolean(),
            channel: channels[0].id,
            local: "en",
            text: faker.lorem.paragraphs(
                faker.random.number({ min: 1, max: 5 })
            ),
            active: faker.random.boolean(),
        })
    }
    console.log('Feed Items seeded...')
}

module.exports = seedFeedItems
