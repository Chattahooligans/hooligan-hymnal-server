const express = require("express");
const router = express.Router();

const langController = require("../controllers/API/langController");
const foesController = require("../controllers/API/foesController");
const goalkeeperNicknameController = require("../controllers/API/goalkeeperNicknameController");
const userController = require("../controllers/API/usersController");
const notificationsController = require("../controllers/API/notificationController");
const playersController = require("../controllers/API/playersController");
const rostersController = require("../controllers/API/rosterController");
const songbooksController = require("../controllers/API/songbookController");
const songsController = require("../controllers/API/songController");

const { catchErrors } = require("../handlers/errorHandlers");
const { apiLoggedIn } = require("../middleware/authMiddleware");

router.get("/i18n-settings", langController.lang);
// Foes
router.get("/foes", catchErrors(foesController.index));
router.get("/foes/:id", catchErrors(foesController.show));
router.post("/foes", apiLoggedIn, catchErrors(foesController.store));
router.put("/foes/:id", apiLoggedIn, catchErrors(foesController.update));
router.delete("/foes/:id", apiLoggedIn, catchErrors(foesController.delete));
// Goalkeepers Nicknames
router.get("/goalkeeperNicknames/last", catchErrors(goalkeeperNicknameController.last));
router.get("/goalkeeperNicknames", catchErrors(goalkeeperNicknameController.index));

// User Info
router.post("/users/login", userController.login);
router.get("/users/me", apiLoggedIn, userController.me);

// Notifications
router.get("/notifications/last", catchErrors(notificationsController.last));
router.post("/notification", apiLoggedIn, catchErrors(notificationsController.store));
// Players
router.get("/players", catchErrors(playersController.index));
router.get("/players/:id", catchErrors(playersController.show));
// Roster
router.get("/rosters", catchErrors(rostersController.index));
router.get("/rosters/active", catchErrors(rostersController.active));
router.get("/rosters/:id", catchErrors(rostersController.show));
// Songbooks
router.get("/songbooks", catchErrors(songbooksController.index));
router.get("/songbooks/:id", catchErrors(songbooksController.show));
// Songs
router.get("/songs", catchErrors(songsController.index));
router.get("/song/:id", catchErrors(songsController.show));

router.post("/delete-thumbnail", catchErrors(playersController.deleteThumbnail));

module.exports = router;
