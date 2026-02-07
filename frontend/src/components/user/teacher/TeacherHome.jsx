import { NavLink, Outlet } from "react-router-dom";

function TeacherHome() {
  return (
    <div className="container mt-4">
      <h3 className="mb-4">👨‍🏫 Teacher Dashboard</h3>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? "active fw-bold" : ""}`
            }
          >
            All Courses
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="add-course"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active fw-bold" : ""}`
            }
          >
            Add Course
          </NavLink>
        </li>
      </ul>

      {/* Child pages */}
      <Outlet />
    </div>
  );
}

export default TeacherHome;
