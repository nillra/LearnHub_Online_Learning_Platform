const express = require("express");
const router = express.Router();

const {
  addCourse,
  getAllCourses,
  deleteCourse,
} = require("../controllers/adminController");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

/* =========================
   COURSE ROUTES
========================= */

// Only TEACHER can add course
router.post(
  "/add-course",
  protect,
  authorizeRoles("teacher"),
  addCourse
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
