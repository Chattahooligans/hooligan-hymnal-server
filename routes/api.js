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

router.get('/i18n-settings', langController.lang);
// Foes
router.get('/foes', catchErrors(foesController.index));
router.get('/foes/:id', catchErrors(foesController.show));

// Goalkeepers Nicknames
router.get('/goalkeeperNicknames/last', catchErrors(goalkeeperNicknameController.last));
router.get('/goalkeeperNicknames', catchErrors(goalkeeperNicknameController.index));

// User Info
router.post('/users/login', userController.login);
router.get('/users/me', apiLoggedIn, userController.me);

// Notifications
router.get('/notifications/last', catchErrors(notificationsController.last));
router.post('/notifications/:id/engagements', catchErrors(notificationsEngagementController.create));
router.get('/notifications/:id/engagements', catchErrors(notificationsEngagementController.show));
router.get('/notifications/:id', catchErrors(notificationsEngagementController.summarize));
// Players
router.get('/players', catchErrors(playersController.index));
router.get('/players/:id', catchErrors(playersController.show));
// Push tokens
router.get('/pushToken', catchErrors(pushTokenController.get));
router.post('/pushToken', catchErrors(pushTokenController.store));
// Roster
router.get('/rosters', catchErrors(rostersController.index));
router.get('/rosters/active', catchErrors(rostersController.active));
router.get('/rosters/:id', catchErrors(rostersController.show));
// Songbooks
router.get('/songbooks', catchErrors(songbooksController.index));
router.get('/songbooks/:id', catchErrors(songbooksController.show));
// Songs
router.get('/songs', catchErrors(songsController.index));
router.get('/song/:id', catchErrors(songsController.show));

// feed
router.get('/feed', catchErrors(feedController.active));
router.post('/feed', apiLoggedIn, checkPermission('feedAllowed'), catchErrors(feedController.store));
// router.delete('/feed', apiLoggedIn, checkPermission('feedAllowed'), catchErrors(feedController.delete));
router.get('/feed/all', catchErrors(feedController.all));
router.get('/feed/:id', catchErrors(feedController.show));
router.get('/feed/channel/:id', catchErrors(feedController.channel));
router.put('/feed/:id/active', apiLoggedIn, checkPermission('feedAllowed'), catchErrors(feedController.activate));
router.delete('/feed/:id/active', apiLoggedIn, checkPermission('feedAllowed'), catchErrors(feedController.deactivate));

// channel
router.get('/channels/', catchErrors(channelController.active));
router.get('/channels/all', catchErrors(channelController.all));
router.post('/channels/', apiLoggedIn, checkPermission('feedAllowed'), catchErrors(channelController.store));

module.exports = router;
