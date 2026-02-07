const Course = require("../schemas/courseModel");

exports.addCourse = async (req, res) => {
  try {
    const {
      C_title,
      C_description,
      C_categories,
      C_price,
      sections,
    } = req.body;

    // req.user comes from JWT (protect middleware)
    const course = await Course.create({
      userID: req.user.id,
      C_educator: req.user.name,   // ✅ FIX HERE
      C_title,
      C_description,
      C_categories,
      C_price,
      sections,
    });

    res.status(201).json({
      message: "Course added successfully",
      course,
    });
  } catch (error) {
    console.error("Add course error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

//  GET ALL COURSES
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("userID", "name email");

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  DELETE COURSE
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.deleteOne();

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
