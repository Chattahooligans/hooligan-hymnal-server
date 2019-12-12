const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const authController = require("../controllers/authController");
const forgotController = require("../controllers/forgotController");
const userController = require("../controllers/userController");
const usersController = require("../controllers/usersController");

const { isLoggedIn } = require("../middleware/authMiddleware");
const { catchErrors } = require("../handlers/errorHandlers");
const { checkPermission } = require("../middleware/PermissionsMiddleware");

router.get("/", homeController.homePage);
router.get("/login", authController.loginForm);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/register", authController.registerForm);
router.post(
  "/register",
  authController.validateRegister,
  authController.register,
  authController.login
);

router.post("/forgot", catchErrors(forgotController.forgot));
router.get("/account", isLoggedIn, userController.account);
router.get("/account/reset/:token", catchErrors(userController.reset));
router.post(
  "/account/reset/:token",
  userController.confirmPassword,
  catchErrors(userController.update)
);
router.get("/account/update", isLoggedIn, userController.updateAccountForm);
router.post(
  "/account/update",
  isLoggedIn,
  catchErrors(userController.updateAccount)
);

// Users routes
router.get(
  "/users",
  isLoggedIn,
  checkPermission("usersAllowed"),
  catchErrors(usersController.allUsers)
);
router.get(
  "/users/create",
  isLoggedIn,
  checkPermission("usersAllowed"),
  usersController.newUserForm
);
router.post(
  "/users/create",
  isLoggedIn,
  checkPermission("usersAllowed"),
  usersController.validateRegister,
  catchErrors(usersController.register)
);
router.get(
  "/users/:id",
  isLoggedIn,
  checkPermission("usersAllowed"),
  catchErrors(usersController.singleUser)
);
router.get(
  "/users/:id/edit",
  isLoggedIn,
  checkPermission("usersAllowed"),
  catchErrors(usersController.editForm)
);
router.post(
  "/users/:id/edit",
  isLoggedIn,
  checkPermission("usersAllowed"),
  catchErrors(usersController.updateUser)
);
router.get(
  "/users/:id/delete",
  isLoggedIn,
  checkPermission("usersAllowed"),
  catchErrors(usersController.deleteConfirm)
);
router.post(
  "/users/:id/delete",
  isLoggedIn,
  checkPermission("usersAllowed"),
  catchErrors(usersController.delete)
);

module.exports = router;
