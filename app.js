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

env.config();

const PORT = process.env.PORT || 3000;
const { MONGO_URI } = process.env;

app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.disable('x-powered-by');
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
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log('Connection has been made');
    },
  )
  .catch((err) => {
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
    require(`./models/${file}`);
  }
});

const Players = mongoose.model('players');
async function changePlayerImages() {
  const players = await Players.find();
  for (const player of players) {
    if (player.image) {
      player.images.push(player.image);
      player.image = undefined;
      player.save();
    }
  }
}
changePlayerImages();

const Songs = mongoose.model('song');
async function changeSongs() {
  const songs = await Songs.find();
  for (const song of songs) {
    if (song.delete_local || song.delete_local == '') {
      song.delete_local = undefined;
      await song.save();
    }
    if (song.reference_title || song.reference_title == '') {
      song.referenceTitle = song.reference_title;
      song.reference_title = undefined;
      await song.save();
    }
    if (song.reference_link || song.reference_link == '') {
      song.referenceLink = song.reference_link;
      song.reference_link = undefined;
      await song.save();
    }
    if (song.player_id || song.player_id == '') {
      song.playerId = song.player_id;
      song.player_id = undefined;
      await song.save();
    }
  }
}

changeSongs();

app.use(passport.initialize());
app.use(passport.session());
require('./handlers/passport');

app.use(flash());

let langs = process.env.INPUT_LANGUAGES;
if (!langs) {
  langs = 'en';
}
langs = langs.split(',').map((lang) => lang.trim());

app.use((req, res, next) => {
  req.breadcrumbs = getBreadcrumbs(req.originalUrl);
  res.locals.h = helpers;
  res.locals.currentUser = req.user || null;
  res.locals.flashes = req.flash();
  res.locals.langs = process.env.INPUT_LANGUAGES ? JSON.parse(process.env.INPUT_LANGUAGES) : ['en'];
  next();
});

app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});
const web = require('./routes/web');

app.use('/', web);
const api = require('./routes/api');

app.use('/api', api);

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
    console.log(`app listening on http://localhost:${PORT}`);
  } else {
    console.log('Express app is running');
  }
});
