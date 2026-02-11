import { useState } from "react";
import API from "../../common/AxiosInstance";

function AddCourse() {
  const [course, setCourse] = useState({
  C_title: "",
  C_price: "",
  C_description: "",
  C_categories: "",
  C_educator: "",
  sectionTitle: "",
});


  const [video, setVideo] = useState(null);

  const handleSubmit = async () => {
  try {
    const formData = new FormData();

    formData.append("C_title", course.C_title);
    formData.append("C_price", course.C_price);
    formData.append("C_description", course.C_description);
    formData.append("sectionTitle", course.sectionTitle);
    formData.append("C_categories", course.C_categories);
    formData.append("C_educator", course.C_educator);
    formData.append("video", video);

    await API.post("/admin/add-course", formData);

    alert("Course Added Successfully");

    // ✅ Clear form
    setCourse({
      C_title: "",
      C_price: "",
      C_description: "",
      C_categories: "",
      C_educator: "",
      sectionTitle: "",
    });

    setVideo(null);

  } catch (error) {
    alert("Only teachers allowed");
    console.log(error);
  }
};


  return (
  <div className="container mt-5">
    <div className="card shadow-lg p-4">
      <h2 className="text-center mb-4 text-primary">Add New Course</h2>

      <div className="mb-3">
        <label className="form-label">Course Title</label>
        <input
          className="form-control"
          value={course.C_title}
          onChange={(e) =>
            setCourse({ ...course, C_title: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <input
          className="form-control"
          value={course.C_categories}
          onChange={(e) =>
            setCourse({ ...course, C_categories: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Educator Name</label>
        <input
          className="form-control"
          value={course.C_educator}
          onChange={(e) =>
            setCourse({ ...course, C_educator: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          className="form-control"
          value={course.C_price}
          onChange={(e) =>
            setCourse({ ...course, C_price: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows="3"
          value={course.C_description}
          onChange={(e) =>
            setCourse({ ...course, C_description: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Section Title</label>
        <input
          className="form-control"
          value={course.sectionTitle}
          onChange={(e) =>
            setCourse({ ...course, sectionTitle: e.target.value })
          }
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Upload Video</label>
        <input
          type="file"
          className="form-control"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />
      </div>

      <div className="d-grid">
        <button
          className="btn btn-primary btn-lg"
          onClick={handleSubmit}
        >
          Submit Course
        </button>
      </div>
    </div>
  </div>
);
}

export default AddCourse;
