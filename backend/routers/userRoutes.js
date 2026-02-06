const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  enrollCourse,
  getMyCourses,
} = require("../controllers/userControllers");

const { protect } = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/enroll", protect, enrollCourse);
router.get("/my-courses", protect, getMyCourses);

module.exports = router;
