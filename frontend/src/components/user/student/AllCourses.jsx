import { useEffect, useState } from "react";
import API from "../../common/AxiosInstance";

function AllCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetches all available courses from the database
    API.get("/users/all-courses") 
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching available courses:", err));
  }, []);

  const handleEnroll = async (courseID) => {
  try {
    // 1. Check if the student is already enrolled
    // Fetches the current user's enrolled list from the backend
    const enrolledRes = await API.get("/api/users/my-courses");
    
    // Check if the current courseID exists in their list
    const isEnrolled = enrolledRes.data.some(
      (enrollment) => enrollment.courseID?._id === courseID
    );

    if (isEnrolled) {
      // If already enrolled, navigate to the course content page
      alert("Redirecting to course content...");
      window.location.href = `/student/course/${courseID}`; 
      return;
    }

    // 2. If not enrolled, handle Payment Simulation
    try {
      await API.post("/api/users/pay", {
        courseID,
        cardholdername: localStorage.getItem("userName") || "Student User", 
        cardnumber: "1234567890123456", // Simulation data
        cvv: "123",
        expmonthyear: "12/2028"
      });
    } catch (payErr) {
      // If payment already exists but enrollment didn't finish, continue
      if (payErr.response?.data?.message !== "Course already purchased") {
        throw payErr;
      }
    }

    // 3. Perform the actual Enrollment
    // The backend verifies successful payment before creating the record
    await API.post("/student/enrolled-courses", { courseID });
    alert("Enrollment Successful!");
    
    // Redirect to the Enrolled Courses tab to see the updated list
    window.location.href = "/student/enrolled";

  } catch (err) {
    console.error("Full Error Object:", err);
    // Alerts the user to the specific backend error message
    alert(err.response?.data?.message || "An error occurred during enrollment.");
  }
};

  return (
    <div className="row mt-3">
      {courses.length > 0 ? courses.map((c) => (
        <div className="col-md-4 mb-4" key={c._id}>
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              {/* Field names match your MongoDB schema */}
              <h5 className="card-title fw-bold">{c.C_name}</h5>
              <p className="card-text text-muted mb-1">Educator: {c.C_educator}</p>
              <h6 className="text-primary fw-bold">Price: ₹{c.C_price}</h6>
              <button 
                onClick={() => handleEnroll(c._id)} 
                className="btn btn-primary w-100 mt-2"
              >
                Start Course
              </button>
            </div>
          </div>
        </div>
      )) : (
        <p className="text-center py-5">No courses found in database.</p>
      )}
    </div>
  );
}

export default AllCourses;