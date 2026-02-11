import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../common/AxiosInstance";

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const [cardData, setCardData] = useState({
    cardholdername: "",
    cardnumber: "",
    cvv: "",
    expmonthyear: "",
  });

  const navigate = useNavigate();

  // 🔹 Fetch all courses
  useEffect(() => {
    API.get("/users/all-courses")
      .then((res) => setCourses(res.data))
      .catch((err) =>
        console.error("Error fetching available courses:", err)
      );
  }, []);

  // 🔹 Handle Start Course
  const handleEnroll = async (course) => {
    try {
      const enrolledRes = await API.get("/users/my-courses");

      const isEnrolled = enrolledRes.data.some(
        (enrollment) => enrollment.courseID?._id === course._id
      );

      if (isEnrolled) {
        navigate(`/student/course/${course._id}`);
        return;
      }

      // 🔥 If not enrolled → open payment modal
      setSelectedCourse(course);
      setShowPayment(true);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Handle Payment
  const handlePayment = async () => {
    try {
      await API.post("/users/pay", {
        courseID: selectedCourse._id,
        amount: selectedCourse.C_price,
        cardholdername: cardData.cardholdername,
        cardnumber: cardData.cardnumber,
        cvv: cardData.cvv,
        expmonthyear: cardData.expmonthyear,
      });

      await API.post("/users/enroll", {
        courseID: selectedCourse._id,
      });

      alert("Payment Successful & Enrolled!");

      setShowPayment(false);
      setCardData({
        cardholdername: "",
        cardnumber: "",
        cvv: "",
        expmonthyear: "",
      });

      navigate(`/student/course/${selectedCourse._id}`);
    } catch (err) {
      console.error(err);
      alert("Payment Failed");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {courses.length > 0 ? (
          courses.map((c) => (
            <div className="col-md-4 mb-4" key={c._id}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="fw-bold">{c.C_title}</h5>
                  <p className="text-muted mb-1">
                    Educator: {c.C_educator}
                  </p>
                  <p className="text-muted">
                    Category: {c.C_categories}
                  </p>
                  <h6 className="text-primary fw-bold">
                    ₹{c.C_price}
                  </h6>

                  <button
                    className="btn btn-primary w-100 mt-2"
                    onClick={() => handleEnroll(c)}
                  >
                    Start Course
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-5">
            No courses found in database.
          </p>
        )}
      </div>

      {/* 🔥 PAYMENT MODAL */}
      {showPayment && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content p-4">
              <h4 className="mb-3">
                Payment for {selectedCourse?.C_title}
              </h4>

              <p>
                <strong>Price:</strong> ₹{selectedCourse?.C_price}
              </p>

              <input
                type="text"
                className="form-control mb-2"
                placeholder="Card Holder Name"
                value={cardData.cardholdername}
                onChange={(e) =>
                  setCardData({
                    ...cardData,
                    cardholdername: e.target.value,
                  })
                }
              />

              <input
                type="text"
                className="form-control mb-2"
                placeholder="Card Number"
                value={cardData.cardnumber}
                onChange={(e) =>
                  setCardData({
                    ...cardData,
                    cardnumber: e.target.value,
                  })
                }
              />

              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="MM/YYYY"
                    value={cardData.expmonthyear}
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        expmonthyear: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="CVV"
                    value={cardData.cvv}
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        cvv: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="text-end mt-3">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setShowPayment(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success"
                  onClick={handlePayment}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllCourses;
