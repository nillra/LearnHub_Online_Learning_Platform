import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../common/AxiosInstance";

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    // Fetches all available courses from the database
    API.get("/users/all-courses") 
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching available courses:", err));
  }, []);

  const handleEnroll = async (courseID) => {
  try {
    // 1. Check if the student is already enrolled
    // Note: Removed '/api' prefix to match your backend router
    const enrolledRes = await API.get("/users/my-courses");
    const isEnrolled = enrolledRes.data.some(
      (enrollment) => enrollment.courseID?._id === courseID
    );

   if (isEnrolled) {
  alert("Welcome back! Redirecting to your course.");
  navigate(`/student/course/${courseID}`);
  return;
}


    // 2. If not enrolled, handle Payment Simulation
    try {
      await API.post("/users/pay", {
        courseID,
        cardholdername: localStorage.getItem("userName") || "Student User", 
        cardnumber: "1111222233334444", 
        cvv: "123",
        expmonthyear: "12/28"
      });
    } catch (payErr) {
      // Handle the "already purchased" case if payment exists but enrollment didn't complete
      if (payErr.response?.data?.message !== "Course already purchased") {
        throw payErr;
      }
    }

    // 3. Perform the actual Enrollment
    await API.post("/users/enroll", { courseID });
    alert("Enrollment Successful!");
    
    // Redirect to the Enrolled Courses tab
    navigate(`/student/course/${courseID}`);


  } catch (err) {
    console.error("Enrollment Error Details:", err.response?.data);
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