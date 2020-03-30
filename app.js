const express = require('express');

const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const env = require('dotenv');
const bodyParser = require('body-parser');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const helmet = require('helmet');
const { promisify } = require('es6-promisify');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const Scheduler = require('./models/scheduledTasks');
const errorHandlers = require('./handlers/errorHandlers');
const helpers = require('./helpers');
const { getBreadcrumbs } = require('./handlers/breadcrumbs');
const compression = require('compression');
const csurf = require('csurf');

const { csrfProtection } = require('./middleware/csrfProtection');

env.config();

const PORT = process.env.PORT || 3000;
const { MONGO_URI } = process.env;

app.use(express.static(`${__dirname}/public`));
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.disable('x-powered-by');
app.use(compression());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  }),
);

app.set('view engine', 'pug');
app.set('views', 'views');

mongoose
  .connect(
    MONGO_URI,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      // eslint-disable-next-line no-console
      console.log('Connection has been made');
    },
  )
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log('App starting error:', err.stack);
    process.exit(1);
  });
mongoose.set('useFindAndModify', false);

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);

fs.readdirSync('models').forEach((file) => {
  if (file.substr(-3) === '.js') {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    require(`./models/${file}`);
  }
});

// modelMigrations();
const Players = mongoose.model('players');
const Songs = mongoose.model('song');
const FeedItems = mongoose.model('feedItem');

async function changePlayerImages() {
  const players = await Players.find();
  players.forEach(async (player) => {
    const p = await Players.findById(player.id);
    if (p.image) {
      p.images.push(p.image);
      p.image = undefined;
      await p.save();
    }
  });
}

async function changeSongs() {
  const songs = await Songs.find();
  songs.forEach(async (song) => {
    const s = await Songs.findById(song.id);
    if (s.delete_local || s.delete_local === '') {
      s.delete_local = undefined;
      await s.save();
    }
    if (s.reference_title || s.reference_title === '') {
      s.referenceTitle = s.reference_title;
      s.reference_title = undefined;
      await s.save();
    }
    if (s.reference_link || s.reference_link === '') {
      s.referenceLink = s.reference_link;
      s.reference_link = undefined;
      await s.save();
    }
    if (s.player_id || s.player_id === '') {
      s.playerId = s.player_id;
      s.player_id = undefined;
      await s.save();
    }
  });
}

async function changeFeedImagesUrlToUri() {
  const feedItems = await FeedItems.find();
  feedItems.forEach(async (feedItem) => {
    const item = await FeedItems.findById(feedItem.id);
    if (item.images) {
      item.images.forEach((img) => {
        if (!img.uri) {
          img.uri = img.url;
        }
        img.url = img.uri;
      });
    }
    item.save();
  });
}

async function modelMigrations() {
  await changePlayerImages();
  await changeSongs();
  await changeFeedImagesUrlToUri();
}

modelMigrations();

app.use(passport.initialize());
app.use(passport.session());
require('./handlers/passport');

app.use(flash());

let langs = process.env.INPUT_LANGUAGES;
if (!langs) {
  langs = 'en';
}
langs = langs.split(',').map((lang) => lang.trim());

const randomId = Math
  .random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.currentUser = req.user || null;
  res.locals.flashes = req.flash();
  res.locals.langs = process.env.INPUT_LANGUAGES ? JSON.parse(process.env.INPUT_LANGUAGES) : ['en'];
  res.locals.randomId = randomId;
  next();
});

app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});
const api = require('./routes/api');

app.use('/api', api);

const web = require('./routes/web');
app.use('/', csrfProtection, (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/', web);

app.use(errorHandlers.notFound);

app.use(errorHandlers.flashValidationErrors);

if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}

Scheduler.loadAllScheduledTasks();
// sample task creation:
// var task = {};
// task.creator = "maxgene@gmail.com";
// task.triggerAt = new Date(2019, 11, 14, 14, 41, 0);
// task.data = { "foo": "bar" };
// Scheduler.scheduleNewsPost(task);

app.use(errorHandlers.productionErrors);

app.listen(PORT, () => {
  if (app.get('env') === 'development') {
    // eslint-disable-next-line no-console
    console.log(`app listening on http://localhost:${PORT}`);
  } else {
    // eslint-disable-next-line no-console
    console.log('Express app is running');
  }
});

module.exports = app;
