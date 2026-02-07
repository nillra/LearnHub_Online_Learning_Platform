const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  enrollCourse,
  getMyCourses,
  payForCourse,
} = require("../controllers/userControllers");

const { protect } = require("../middlewares/authMiddleware");

// AUTH
router.post("/register", registerUser);
router.post("/login", loginUser);

// STUDENT FEATURES
router.post("/pay", protect, payForCourse);
router.post("/enroll", protect, enrollCourse);
router.get("/my-courses", protect, getMyCourses);

module.exports = router;
