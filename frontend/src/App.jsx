import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/common/NavBar";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";

import StudentHome from "./components/user/student/StudentHome";
import TeacherHome from "./components/user/teacher/TeacherHome";
import AllCourses from "./components/user/teacher/AllCourses";
import AddCourse from "./components/user/teacher/AddCourse";
import AdminHome from "./components/admin/AdminHome";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Teacher Nested Routes */}
        <Route path="/teacher" element={<TeacherHome />}>
          <Route index element={<AllCourses />} />
          <Route path="add-course" element={<AddCourse />} />
        </Route>

        <Route path="/student" element={<StudentHome />} />
        <Route path="/admin" element={<AdminHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
