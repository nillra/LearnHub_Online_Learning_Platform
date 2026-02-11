const express = require("express");
const router = express.Router();

const {
  getAllCourses,
  deleteCourse,
  addCourseWithVideo,
} = require("../controllers/adminController");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/videoUpload");

/* =========================
   COURSE ROUTES
========================= */

// Only TEACHER can add course with video
router.post(
  "/add-course",
  protect,
  authorizeRoles("teacher"),
  upload.single("video"),
  addCourseWithVideo
);

// Anyone can view courses
router.get("/courses", getAllCourses);

// Only ADMIN can delete course
router.delete(
  "/course/:id",
  protect,
  authorizeRoles("admin"),
  deleteCourse
);

module.exports = router;
