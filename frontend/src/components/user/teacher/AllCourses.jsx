import { useEffect, useState } from "react";
import API from "../../common/AxiosInstance";

function AllCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/admin/courses")
      .then((res) => setCourses(res.data))
      .catch(() => alert("Failed to load courses"));
  }, []);

  return (
    <div className="row">
      {courses.map((course) => (
        <div className="col-md-4 mb-4" key={course._id}>
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5>{course.C_title}</h5>
              <p>{course.C_description}</p>
              <span className="badge bg-primary">
                ₹{course.C_price}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllCourses;
