const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const authController = require("../controllers/authController");

const { isLoggedIn } = require("../middleware/authMiddleware");

router.get("/", homeController.homePage);
router.get("/login", authController.loginForm);
router.post("/login", authController.login);

module.exports = router;
