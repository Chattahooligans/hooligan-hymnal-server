const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

const db = mongoose.connect(
    MONGO_URI,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        // eslint-disable-next-line no-console
        console.log()
    },
).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(`App starting error: `, err.stack);
    process.exit(1);
});
mongoose.set('useFindAndModify', false);

module.exports = db;
