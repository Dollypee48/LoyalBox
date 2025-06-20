const express = require("express");
const router = express.Router();
const {
  registerUser,
  registerAdmin,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

// Public routes
router.post("/register", registerUser);          // Regular user registration
router.post("/registerAdmin", registerAdmin);   // Admin registration
router.post("/login", loginUser);                // Login
router.post("/logout", logoutUser);              // Logout

module.exports = router;
