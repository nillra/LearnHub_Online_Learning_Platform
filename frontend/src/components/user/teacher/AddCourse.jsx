import { useState } from "react";
import API from "../../common/AxiosInstance";

function AddCourse() {
  const [course, setCourse] = useState({
    title: "",
    price: 0,
    description: "",
  });

  const handleSubmit = async () => {
    try {
      await API.post("/teacher/course", course);
      alert("Course Added");
    } catch {
      alert("Only teachers allowed");
    }
  };

  return (
    <div className="page">
      <h2>Add Course</h2>

      <input
        placeholder="Course Title"
        onChange={(e) => setCourse({ ...course, title: e.target.value })}
      />
      <input
        placeholder="Price"
        onChange={(e) => setCourse({ ...course, price: e.target.value })}
      />
      <textarea
        placeholder="Description"
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AddCourse;
