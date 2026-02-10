import { NavLink, Routes, Route } from "react-router-dom";
import EnrolledCourses from "./EnrolledCourses";
import AllCourses from "./AllCourses";

function StudentHome() {
  return (
    <div className="container mt-4">
      <h3>🎓 Student Dashboard</h3>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          {/* Use absolute path to prevent URL appending */}
          <NavLink end to="/student" className="nav-link">
            All Courses
          </NavLink>
        </li>
        <li className="nav-item">
          {/* Use absolute path to prevent URL appending */}
          <NavLink to="/student/enrolled" className="nav-link">
            My Enrolled Courses
          </NavLink>
        </li>
      </ul>

      <Routes>
        {/* Render AllCourses at the base student route */}
        <Route index element={<AllCourses />} />
        <Route path="enrolled" element={<EnrolledCourses />} />
      </Routes>
    </div>
  );
}

export default StudentHome;