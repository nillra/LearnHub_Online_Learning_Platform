import { NavLink, Routes, Route } from "react-router-dom";
import AddCourse from "./AddCourse";
import AllCourses from "./AllCourses";

function TeacherHome() {
  return (
    <div className="container mt-4">
      <h3 className="mb-4">👨‍🏫 Teacher Dashboard</h3>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <NavLink end to="" className="nav-link">
            All Courses
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="add-course" className="nav-link">
            Add Course
          </NavLink>
        </li>
      </ul>

      <Routes>
        <Route index element={<AllCourses />} />
        <Route path="add-course" element={<AddCourse />} />
      </Routes>
    </div>
  );
}

export default TeacherHome;
