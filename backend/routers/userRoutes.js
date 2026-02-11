const express = require("express");
const router = express.Router();

const Course = require("../schemas/courseModel");

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
// router.get("/allcourses", protect, allCourses);

// Add this route to your existing router
const { getAllCourses } = require("../controllers/userControllers");
router.get("/all-courses", getAllCourses);

// Get single course content (for enrolled student)
router.get("/course/:id", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    console.error("COURSE FETCH ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
