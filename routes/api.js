const express = require("express");
const router = express.Router();

const langController = require("../controllers/API/langController");
const foesController = require("../controllers/API/foesController");

const { catchErrors } = require("../handlers/errorHandlers");
const { apiLoggedIn } = require("../middleware/authMiddleware");

router.get("/i18n-settings", langController.lang);
// Foes
router.get("/foes", catchErrors(foesController.index));
router.get("/foes/:id", catchErrors(foesController.show));
router.post("/foes", apiLoggedIn, catchErrors(foesController.store));

module.exports = router;
