const express = require("express");
const router = express.Router();

const langController = require("../controllers/API/langController");
const foesController = require("../controllers/API/foesController");
const goalkeeperNicknameController = require("../controllers/API/goalkeeperNicknameController");
const userController = require("../controllers/API/usersController");

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
router.get(
  "/goalkeeperNicknames/last",
  catchErrors(goalkeeperNicknameController.last)
);
router.get(
  "/goalkeeperNicknames",
  catchErrors(goalkeeperNicknameController.index)
);

// User Info
router.post("/users/login", userController.login);
router.get("/users/me", userController.me);

module.exports = router;
