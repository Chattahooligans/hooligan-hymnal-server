const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const authController = require("../controllers/authController");
const forgotController = require("../controllers/forgotController");
const userController = require("../controllers/userController");
const usersController = require("../controllers/usersController");
const rostersController = require("../controllers/rostersController");

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
// Rosters
router.get(
  "/rosters",
  isLoggedIn,
  checkPermission("rosterAllowed"),
  catchErrors(rostersController.index)
);
router.get(
  "/rosters/create",
  isLoggedIn,
  checkPermission("rosterAllowed"),
  rostersController.create
);
router.post(
  "/rosters/create",
  isLoggedIn,
  checkPermission("rosterAllowed"),
  rostersController.store
);
router.get(
  "/rosters/:id",
  isLoggedIn,
  checkPermission("rosterAllowed"),
  catchErrors(rostersController.show)
);
router.get(
  "/rosters/:id/edit",
  isLoggedIn,
  checkPermission("rosterAllowed"),
  catchErrors(rostersController.edit)
);
router.post(
  "/rosters/:id/edit",
  isLoggedIn,
  checkPermission("rosterAllowed"),
  rostersController.update
);
router.get(
  "/rosters/:id/delete",
  isLoggedIn,
  checkPermission("rosterAllowed"),
  rostersController.delete
);

module.exports = router;
