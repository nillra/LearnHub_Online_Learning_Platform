const Course = require("../schemas/courseModel");

// ➕ ADD COURSE (Teacher)
exports.addCourse = async (req, res) => {
  try {
    const {
      C_educator,
      C_categories,
      C_title,
      C_description,
      sections,
      C_price,
    } = req.body;

    const course = await Course.create({
      userID: req.user.id, // from JWT
      C_educator,
      C_categories,
      C_title,
      C_description,
      sections,
      C_price,
    });

    res.status(201).json({
      message: "Course added successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
