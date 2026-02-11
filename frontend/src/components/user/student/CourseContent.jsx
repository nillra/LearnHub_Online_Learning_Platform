import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../common/AxiosInstance";

function CourseContent() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);
  console.log(isCourseCompleted);


  useEffect(() => {
    API.get(`/users/course/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error(err));
    API.get(`/users/progress/${id}`)
  .then(res => {
    setCompletedVideos(res.data.completedSections);
    setIsCourseCompleted(res.data.isCompleted);
  });

  }, [id]);

  if (!course) return <p className="text-center mt-5">Loading...</p>;

  const handleVideoEnd = async () => {
  if (!completedVideos.includes(currentIndex)) {

    await API.post("/users/complete-section", {
      courseID: id,
      sectionIndex: currentIndex,
    });

    setCompletedVideos([...completedVideos, currentIndex]);
  }
};


  const allCompleted =
    course.sections.length === completedVideos.length;

  return (
    <div className="container-fluid mt-4">
      <div className="row">

        {/* Sidebar */}
        <div className="col-md-3 border-end">
          <h5 className="mb-3">Course Sections</h5>
          <ul className="list-group">
            {course.sections.map((section, index) => (
              <li
                key={index}
                className={`list-group-item ${
                  index === currentIndex ? "active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setCurrentIndex(index)}
              >
                {section.title}
                {completedVideos.includes(index) && (
                  <span className="ms-2 text-success">✔</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Video Area */}
        <div className="col-md-9">
          <h3 className="mb-3">
            {course.sections[currentIndex].title}
          </h3>

          <video
            key={currentIndex}
            width="100%"
            height="450"
            controls
            onEnded={handleVideoEnd}
            className="rounded shadow"
          >
            <source
              src={`http://localhost:5000${course.sections[currentIndex].videoUrl}`}
              type="video/mp4"
            />
          </video>

          <div className="mt-4">
            <button
  className="btn btn-success"
  disabled={!allCompleted}
  onClick={async () => {
    try {
      const response = await API.get(
        `/users/certificate/${id}`,
        { responseType: "blob" }   // VERY IMPORTANT
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `certificate-${course.C_title}.pdf`
      );

      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error("Certificate Download Error:", error);
    }
  }}
>
  Download Certificate
</button>



            {!allCompleted && (
              <p className="text-muted mt-2">
                Complete all sections to unlock certificate.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default CourseContent;
