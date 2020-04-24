const express = require('express');

const router = express.Router();

const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const forgotController = require('../controllers/forgotController');
const userController = require('../controllers/userController');
const usersController = require('../controllers/usersController');
const rostersController = require('../controllers/rostersController');
const playersController = require('../controllers/playersController');
const songbooksController = require('../controllers/songbooksController');
const songsController = require('../controllers/songsController');
const songbookSongsController = require('../controllers/songbookSongsController');
const notificationsController = require('../controllers/notificationsController');
const pushTokensController = require('../controllers/pushTokensController');
const foesController = require('../controllers/foesController');
const channelController = require('../controllers/channelController');

const { isLoggedIn } = require('../middleware/authMiddleware');
const { catchErrors } = require('../handlers/errorHandlers');
const { checkPermission } = require('../middleware/PermissionsMiddleware');
const { csrfProtection } = require('../middleware/csrfProtection');

router.get('/', homeController.homePage);
router.get('/login', authController.loginForm);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/register', authController.registerForm);
router.post('/register', authController.validateRegister, catchErrors(authController.register), authController.login);
router.get('/forgot', userController.resetForm);
router.post('/forgot', catchErrors(forgotController.forgot));
router.get('/account', isLoggedIn, userController.account);
router.get('/account/reset/:token', catchErrors(userController.reset));
router.post('/account/reset/:token', userController.confirmPassword, catchErrors(userController.update));
router.get('/account/update', isLoggedIn, userController.updateAccountForm);
router.post('/account/update', isLoggedIn, catchErrors(userController.updateAccount));

// Users routes
router.get('/users', isLoggedIn, checkPermission('usersAllowed'), catchErrors(usersController.allUsers));
router.get('/users/create', isLoggedIn, checkPermission('usersAllowed'), usersController.newUserForm);
router.post('/users/create', isLoggedIn, checkPermission('usersAllowed'), usersController.validateRegister, catchErrors(usersController.register));
router.get('/users/:id', isLoggedIn, checkPermission('usersAllowed'), catchErrors(usersController.singleUser));
router.get('/users/:id/edit', isLoggedIn, checkPermission('usersAllowed'), catchErrors(usersController.editForm));
router.post('/users/:id/edit', isLoggedIn, checkPermission('usersAllowed'), catchErrors(usersController.updateUser));
router.get('/users/:id/delete', isLoggedIn, checkPermission('usersAllowed'), catchErrors(usersController.deleteConfirm));
router.post('/users/:id/delete', isLoggedIn, checkPermission('usersAllowed'), catchErrors(usersController.delete));
// Rosters
router.get('/rosters', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(rostersController.index));
router.get('/rosters/create', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(rostersController.create));
router.post('/rosters/create', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(rostersController.store));
router.get('/rosters/:id', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(rostersController.show));
router.get('/rosters/:id/edit', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(rostersController.edit));
router.post('/rosters/:id/edit', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(rostersController.update));
router.get('/rosters/:id/delete', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(rostersController.deleteConfirm));
router.post('/rosters/:id/delete', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(rostersController.delete));

// Players
router.post('/players/thumbnail', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(playersController.uploadThumbnail));
router.post('/players/images', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(playersController.uploadImages));
router.get('/players', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(playersController.index));
router.get('/players-partial', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(playersController.search));
router.get('/players/create', isLoggedIn, checkPermission('rosterAllowed'), playersController.create);
router.post('/players/create', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(playersController.store));
router.get('/players/images', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(playersController.getImages));

router.post('/players/remove-images', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(playersController.removeImage));
router.get('/players/:id', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(playersController.show));
router.get('/players/:id/edit', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(playersController.edit));
router.post('/players/:id/edit', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(playersController.update));
router.get('/players/:id/thumbnail', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(playersController.playersThumbnail));
router.post('/players/:id/thumbnail/delete', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(playersController.playersRemoveThumbnail));
router.get('/players/:id/delete', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(playersController.deleteConfirm));
router.post('/players/:id/delete', isLoggedIn, checkPermission('rosterAllowed'), catchErrors(playersController.delete));

// Songbooks
router.get('/songbooks', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songbooksController.index));
router.get('/songbooks/create', isLoggedIn, checkPermission('songbookAllowed'), songbooksController.create);
router.post('/songbooks/create', isLoggedIn, checkPermission('songbookAllowed'), songbooksController.store);
router.get('/songbooks/covers', checkPermission('songbookAllowed'), catchErrors(songbooksController.getCovers));
router.post('/songbooks/remove-cover', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songbooksController.removeCover));
router.get('/songbooks/:id/', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songbooksController.show));
router.get('/songbooks/:id/edit', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songbooksController.edit));
router.post('/songbooks/:id/edit', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songbooksController.update));
router.get('/songbooks/:id/delete', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songbooksController.deleteConfirm));
router.post('/songbooks/:id/delete', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songbooksController.delete));

// Songbook Chapters
router.get('/songbooks/:id/add-chapter', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songbooksController.addChapter));
router.post('/songbooks/:id/add-chapter', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songbooksController.saveChapter));
router.get('/songbooks/:songbookId/chapters/:chapterId/delete', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songbooksController.removeChapterConfirm));
router.post('/songbooks/:songbookId/chapters/:chapterId/delete', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songbooksController.removeChapter));
router.get('/songbooks/:songbookId/chapters/:chapterId', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songbookSongsController.songbookChapter));
router.get('/songbooks/:songbookId/chapters/:chapterId/songs', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songbookSongsController.addSongsToChapterForm));
router.post('/songbooks/:songbookId/chapters/:chapterId/songs', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songbookSongsController.addSongsToChapter));

router.post('/songbooks/front-cover', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songbooksController.frontCoverUpload));
router.post('/songbooks/back-cover', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songbooksController.backCoverUpload));



// Songs
router.get('/songs', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songsController.index));
router.get('/songs-partial', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songsController.search));
router.get('/songs/create', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songsController.create));
router.post('/songs/create', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songsController.store));
router.get('/songs/:id', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songsController.show));
router.get('/songs/:id/edit', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songsController.edit));
router.post('/songs/:id/edit', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songsController.update));
router.get('/songs/:id/delete', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songsController.deleteConfirm));
router.post('/songs/:id/delete', isLoggedIn, checkPermission('songbookAllowed'), catchErrors(songsController.delete));

// Notifications??
router.get('/notifications', isLoggedIn, checkPermission('pushNotificationsAllowed'), catchErrors(notificationsController.index));
router.get('/notifications/create', isLoggedIn, checkPermission('pushNotificationsAllowed'), notificationsController.create);
router.post('/notifications/create', isLoggedIn, checkPermission('pushNotificationsAllowed'), catchErrors(notificationsController.store));
router.get('/notifications/:id', isLoggedIn, checkPermission('pushNotificationsAllowed'), catchErrors(notificationsController.show));
router.get('/notifications/:id/edit', isLoggedIn, checkPermission('pushNotificationsAllowed'), catchErrors(notificationsController.edit));
router.post('/notifications/:id/edit', isLoggedIn, checkPermission('pushNotificationsAllowed'), catchErrors(notificationsController.update));
router.get('/notifications/:id/delete', isLoggedIn, checkPermission('pushNotificationsAllowed'), catchErrors(notificationsController.deleteConfirm));
router.post('/notifications/:id/delete', isLoggedIn, checkPermission('pushNotificationsAllowed'), catchErrors(notificationsController.delete));

// Push tokens
router.get('/push-tokens', isLoggedIn, checkPermission('pushNotificationsAllowed'), catchErrors(pushTokensController.index));
router.get('/push-tokens/create', isLoggedIn, checkPermission('pushNotificationsAllowed'), pushTokensController.create);
router.post('/push-tokens/create', isLoggedIn, checkPermission('pushNotificationsAllowed'), catchErrors(pushTokensController.store));
router.get('/push-tokens/:id', isLoggedIn, checkPermission('pushNotificationsAllowed'), catchErrors(pushTokensController.show));
router.get('/push-tokens/:id/edit', isLoggedIn, checkPermission('pushNotificationsAllowed'), catchErrors(pushTokensController.edit));
router.post('/push-tokens/:id/edit', isLoggedIn, checkPermission('pushNotificationsAllowed'), catchErrors(pushTokensController.update));
router.get('/push-tokens/:id/delete', isLoggedIn, checkPermission('pushNotificationsAllowed'), catchErrors(pushTokensController.deleteConfirm));
router.post('/push-tokens/:id/delete', isLoggedIn, checkPermission('pushNotificationsAllowed'), catchErrors(pushTokensController.delete));

// Foes
router.get('/foes', isLoggedIn, checkPermission('foesAllowed'), catchErrors(foesController.index));
router.post('/foes/logo', isLoggedIn, checkPermission('foesAllowed'), catchErrors(foesController.logo));
router.get('/foes/create', isLoggedIn, checkPermission('foesAllowed'), foesController.create);
router.post('/foes/create', isLoggedIn, checkPermission('foesAllowed'), catchErrors(foesController.store));
router.get('/foes/logos', isLoggedIn, checkPermission('foesAllowed'), catchErrors(foesController.getLogo));
router.post('/foes/remove-logo', isLoggedIn, checkPermission('foesAllowed'), catchErrors(foesController.removeLogo));
router.get('/foes/:id', isLoggedIn, checkPermission('foesAllowed'), catchErrors(foesController.show));
router.get('/foes/:id/edit', isLoggedIn, checkPermission('foesAllowed'), catchErrors(foesController.edit));
router.post('/foes/:id/edit', isLoggedIn, checkPermission('foesAllowed'), catchErrors(foesController.update));
router.get('/foes/:id/delete', isLoggedIn, checkPermission('foesAllowed'), catchErrors(foesController.deleteConfirm));
router.post('/foes/:id/delete', isLoggedIn, checkPermission('foesAllowed'), catchErrors(foesController.delete));

router.get('/channels', isLoggedIn, checkPermission('feedAllowed'), catchErrors(channelController.index));
router.get('/channels/create', isLoggedIn, checkPermission('feedAllowed'), catchErrors(channelController.create));
router.post('/channels/create', isLoggedIn, checkPermission('feedAllowed'), catchErrors(channelController.store));
router.post('/channels/avatar', isLoggedIn, checkPermission('feedAllowed'), catchErrors(channelController.avatar));
router.get('/channels/avatars', isLoggedIn, checkPermission('feedAllowed'), catchErrors(channelController.getAvatars));
router.post('/channels/remove-avatar', isLoggedIn, checkPermission('feedAllowed'), catchErrors(channelController.removeAvatar));
router.get('/channels/:id', isLoggedIn, checkPermission('feedAllowed'), catchErrors(channelController.show));
router.get('/channels/:id/edit', isLoggedIn, checkPermission('feedAllowed'), catchErrors(channelController.edit));
router.post('/channels/:id/edit', isLoggedIn, checkPermission('feedAllowed'), catchErrors(channelController.update));
router.get('/channels/:id/delete', isLoggedIn, checkPermission('feedAllowed'), catchErrors(channelController.deleteConfirm));
router.post('/channels/:id/delete', isLoggedIn, checkPermission('feedAllowed'), catchErrors(channelController.delete));


module.exports = router;
