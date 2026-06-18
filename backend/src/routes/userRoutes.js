const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  register,
  login,
  getProfile,
  updatePreferences,
} =
require("../controllers/userController");

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

router.put(
  "/preferences",
  authMiddleware,
  updatePreferences
);

module.exports = router;