const express = require("express");
const router = express.Router();

// Import controller functions
const {
  generateQuestion,
  submitAnswer,
  analytics
} = require("../controllers/interviewController");

// Import auth middleware
const auth = require("../middleware/authMiddleware");

// Generate question
router.post("/generate", auth, generateQuestion);

// Submit answer
router.post("/submit", auth, submitAnswer);

// 📊 Analytics route
router.get("/analytics", auth, analytics);

module.exports = router;