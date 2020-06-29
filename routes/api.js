const express = require('express');

const router = express.Router();

const langController = require('../controllers/API/langController');
const foesController = require('../controllers/API/foesController');
const goalkeeperNicknameController = require('../controllers/API/goalkeeperNicknameController');
const userController = require('../controllers/API/usersController');
const notificationsController = require('../controllers/API/notificationController');
const playersController = require('../controllers/API/playersController');
const pushTokenController = require('../controllers/API/pushTokenController');
const rostersController = require('../controllers/API/rosterController');
const songbooksController = require('../controllers/API/songbookController');
const songsController = require('../controllers/API/songController');
const feedController = require('../controllers/API/feedController');
const channelController = require('../controllers/API/channelsController');
const notificationsEngagementController = require('../controllers/API/notificationEngagementController');

const { catchErrors } = require('../handlers/errorHandlers');
const { apiLoggedIn } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/PermissionsMiddleware');
const { inMemoryCacheMiddleware } = require('../middleware/cacheMiddleware');

const config = require('../config');

router.get('/i18n-settings', inMemoryCacheMiddleware(config.cache_timeout), langController.lang);
// Foes
router.get('/foes', inMemoryCacheMiddleware(config.cache_timeout, 'foes'), catchErrors(foesController.index));
router.get('/foes/all', inMemoryCacheMiddleware(config.cache_timeout, 'foes'), catchErrors(foesController.index));
router.get('/foes/:id', inMemoryCacheMiddleware(config.cache_timeout), catchErrors(foesController.show));

// Goalkeepers Nicknames
router.get('/goalkeeperNicknames/last', inMemoryCacheMiddleware(config.cache_timeout), catchErrors(goalkeeperNicknameController.last));
router.get('/goalkeeperNicknames', inMemoryCacheMiddleware(config.cache_timeout), catchErrors(goalkeeperNicknameController.index));

// User Info
router.post('/users/login', userController.login);
router.get('/users/me', apiLoggedIn, userController.me);

// Notifications
router.get('/notifications/last', inMemoryCacheMiddleware(config.cache_timeout), catchErrors(notificationsController.last));
router.post('/notifications/:id/engagements', catchErrors(notificationsEngagementController.create));
router.get('/notifications/:id/engagements', catchErrors(notificationsEngagementController.show));
router.get('/notifications/:id', catchErrors(notificationsEngagementController.summarize));
// Players
router.get('/players', inMemoryCacheMiddleware(config.cache_timeout, 'players'), catchErrors(playersController.index));
router.get('/players/:id', inMemoryCacheMiddleware(config.cache_timeout), catchErrors(playersController.show));
// Push tokens
router.get('/pushToken', catchErrors(pushTokenController.get));
router.post('/pushToken', catchErrors(pushTokenController.store));
// Roster
router.get('/rosters', inMemoryCacheMiddleware(config.cache_timeout, 'active_rosters'), catchErrors(rostersController.active));
router.get('/rosters/all', inMemoryCacheMiddleware(config.cache_timeout, 'rosters'), catchErrors(rostersController.index));
router.get('/rosters/:id', inMemoryCacheMiddleware(config.cache_timeout), catchErrors(rostersController.show));
// Songbooks
router.get('/songbooks', inMemoryCacheMiddleware(config.cache_timeout, 'songbooks'), catchErrors(songbooksController.index));
router.get('/songbooks/:id', inMemoryCacheMiddleware(config.cache_timeout), catchErrors(songbooksController.show));
// Songs
router.get('/songs', inMemoryCacheMiddleware(config.cache_timeout, 'songs'), catchErrors(songsController.index));
router.get('/song/:id', inMemoryCacheMiddleware(config.cache_timeout), catchErrors(songsController.show));

// feed
router.get('/feed', inMemoryCacheMiddleware(config.cache_timeout), catchErrors(feedController.active));
router.post('/feed', apiLoggedIn, checkPermission('feedAllowed'), catchErrors(feedController.store));
// router.delete('/feed', apiLoggedIn, checkPermission('feedAllowed'), catchErrors(feedController.delete));
router.get('/feed/all', inMemoryCacheMiddleware(config.cache_timeout, 'feed_all'), catchErrors(feedController.all));
router.get('/feed/:id', inMemoryCacheMiddleware(config.cache_timeout), catchErrors(feedController.show));
router.get('/feed/channel/:id', inMemoryCacheMiddleware(config.cache_timeout), catchErrors(feedController.channel));
router.put('/feed/:id/active', apiLoggedIn, checkPermission('feedAllowed'), catchErrors(feedController.activate));
router.delete('/feed/:id/active', apiLoggedIn, checkPermission('feedAllowed'), catchErrors(feedController.deactivate));

// channel
router.get('/channels/', inMemoryCacheMiddleware(config.cache_timeout, 'channels_active'), catchErrors(channelController.active));
router.get('/channels/all', inMemoryCacheMiddleware(config.cache_timeout, 'channels'), catchErrors(channelController.all));
router.post('/channels/', apiLoggedIn, checkPermission('feedAllowed'), catchErrors(channelController.store));

module.exports = router;
