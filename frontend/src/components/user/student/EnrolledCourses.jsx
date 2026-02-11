import { useEffect, useState } from "react";
import API from "../../common/AxiosInstance";
import { useNavigate } from "react-router-dom";

function EnrolledCourses() {
  const [enrolled, setEnrolled] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    // Matches your backend router
    API.get("/users/my-courses")
      .then((res) => setEnrolled(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Educator</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {enrolled
          .filter(item => item.courseID)
          .length > 0 ? 
          enrolled
          .filter(item => item.courseID)
          .map((item) => (
            <tr key={item._id}>
              {/* MongoDB _id used as course identity */}
              <td>{item.courseID?._id}</td>
              <td className="fw-bold">{item.courseID?.C_name}</td>
              <td>{item.courseID?.C_educator}</td>
              <td>{item.courseID?.C_category}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => navigate(`/student/course/${item.courseID?._id}`)}>
                  GO TO
                </button>

              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-muted">
                yet to be enrolled courses
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EnrolledCourses;