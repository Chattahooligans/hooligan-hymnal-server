const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const authController = require("../controllers/authController");
const forgotController = require("../controllers/forgotController");
const userController = require("../controllers/userController");

const { isLoggedIn } = require("../middleware/authMiddleware");
const { catchErrors } = require("../handlers/errorHandlers");

router.get("/", homeController.homePage);
router.get("/login", authController.loginForm);
router.post("/login", authController.login);
router.post("/logout", isLoggedIn, authController.logout);
router.get("/register", authController.registerForm);
router.post(
  "/register",
  authController.validateRegister,
  authController.register,
  authController.login
);

router.post("/forgot", catchErrors(forgotController.forgot));
router.get("/account/reset/:token", catchErrors(userController.reset));
router.post(
  "/account/reset/:token",
  userController.confirmPassword,
  catchErrors(userController.update)
);

module.exports = router;
