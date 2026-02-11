import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../common/AxiosInstance";

function CourseContent() {
  const { id } = useParams();
  console.log("Course ID:", id);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    API.get(`/users/course/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!course) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        Welcome to the course: {course.C_title}
      </h2>

      {course.sections?.map((section, index) => (
        <div key={index} className="mb-4">
          <h5>{section.title}</h5>

          <video
            width="100%"
            height="400"
            controls
            className="rounded shadow"
          >
            <source
              src={`http://localhost:5000${section.videoUrl}`}
              type="video/mp4"
            />
          </video>
        </div>
      ))}

      <button className="btn btn-success mt-3">
        Download Certificate
      </button>
    </div>
  );
}

export default CourseContent;
