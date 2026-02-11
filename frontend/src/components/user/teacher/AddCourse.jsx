import { useState } from "react";
import API from "../../common/AxiosInstance";

function AddCourse() {
  const [course, setCourse] = useState({
    C_title: "",
    C_price: "",
    C_description: "",
    C_categories: "",
    C_educator: "",
  });

  const [sections, setSections] = useState([
    { title: "", video: null },
  ]);

  // Add new section
  const addSection = () => {
    setSections([...sections, { title: "", video: null }]);
  };

  // Handle section change
  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const handleSubmit = async () => {
  try {
    const formData = new FormData();

    formData.append("C_title", course.C_title);
    formData.append("C_price", course.C_price);
    formData.append("C_description", course.C_description);
    formData.append("C_categories", course.C_categories);
    formData.append("C_educator", course.C_educator);

    // Send section titles as JSON
    const sectionTitles = sections.map(sec => sec.title);
    formData.append("sectionTitles", JSON.stringify(sectionTitles));

    // Append all videos
    sections.forEach(section => {
      formData.append("videos", section.video);
    });

    await API.post("/admin/add-course", formData);

    alert("Course Added Successfully");

  } catch (error) {
    console.log(error);
    alert("Error adding course");
  }
};


  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4 text-primary">
          Add New Course
        </h2>

        {/* Course Fields */}

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

        <div className="mb-4">
          <label className="form-label">Description</label>
          <textarea
            rows="3"
            className="form-control"
            value={course.C_description}
            onChange={(e) =>
              setCourse({ ...course, C_description: e.target.value })
            }
          />
        </div>

        <hr />

        {/* Sections */}

        <h5 className="mb-3">Course Sections</h5>

        {sections.map((section, index) => (
          <div
            key={index}
            className="border rounded p-3 mb-3 bg-light"
          >
            <div className="mb-3">
              <label className="form-label">
                Section Title {index + 1}
              </label>
              <input
                className="form-control"
                value={section.title}
                onChange={(e) =>
                  handleSectionChange(
                    index,
                    "title",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="form-label">
                Upload Video
              </label>
              <input
                type="file"
                className="form-control"
                accept="video/*"
                onChange={(e) =>
                  handleSectionChange(
                    index,
                    "video",
                    e.target.files[0]
                  )
                }
              />
            </div>
          </div>
        ))}

        <div className="text-end mb-4">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={addSection}
          >
            + Add More Section
          </button>
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
