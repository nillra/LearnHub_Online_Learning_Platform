import { useState } from "react";
import API from "../../common/AxiosInstance";

function AddCourse() {
  const [course, setCourse] = useState({
    C_title: "",
    C_description: "",
    C_categories: "",
    C_price: "",
    sections: "",
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/admin/add-course", {
        ...course,
        C_price: Number(course.C_price),
        sections: course.sections.split(","),
      });

      alert("Course added successfully");

      setCourse({
        C_title: "",
        C_description: "",
        C_categories: "",
        C_price: "",
        sections: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error adding course");
    }
  };

  return (
    <div className="card shadow p-4">
      <h5>➕ Add New Course</h5>

      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" name="C_title" placeholder="Title" value={course.C_title} onChange={handleChange} required />
        <textarea className="form-control mb-3" name="C_description" placeholder="Description" value={course.C_description} onChange={handleChange} required />
        <input className="form-control mb-3" name="C_categories" placeholder="Category" value={course.C_categories} onChange={handleChange} required />
        <input className="form-control mb-3" name="C_price" type="number" placeholder="Price" value={course.C_price} onChange={handleChange} required />
        <input className="form-control mb-3" name="sections" placeholder="Sections (comma separated)" value={course.sections} onChange={handleChange} required />

        <button className="btn btn-primary w-100">Add Course</button>
      </form>
    </div>
  );
}

export default AddCourse;
