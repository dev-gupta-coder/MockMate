// Import express library
// Express Router helps us create API routes
const express = require("express");

// Create a router object
const router = express.Router();

// Import authentication controller functions
// These contain the logic for register and login
const {
  register,
  login
} = require("../controllers/authController");


// ============================
// Register Route
// ============================

// When frontend sends POST request to
// /api/auth/register
// this function will run register controller
router.post("/register", register);


// ============================
// Login Route
// ============================

// When frontend sends POST request to
// /api/auth/login
// this function will run login controller
router.post("/login", login);


// Export router so server.js can use it
module.exports = router;