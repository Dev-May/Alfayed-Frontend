import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const base_Url = "http://127.0.0.1:8000/api";

function TeacherDetail() {
  const [teacherData, setTeacherData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [skillList, setSkillList] = useState([]);
  let { teacher_id } = useParams();

  // Fetch Teacher Profile when page load
  useEffect(() => {
    try {
      axios.get(base_Url + "/teacher/" + teacher_id).then((res) => {
        setTeacherData(res.data);
        setCourseData(res.data.course);
        setSkillList(res.data.skill_list);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-3" dir="rtl">
      <div className="row">
        <div className="col-4">
          <img
            src="/logo512.png"
            className="img-thumbnail"
            alt="Teacher Image"
          />
        </div>
        <div className="col-8">
          <h3>{teacherData.full_name}</h3>
          <p>{teacherData.bio}</p>
          <p className="fw-bold">
            المواد العلمية:&nbsp;
            {skillList.map((skill, index) => (
              <Link
                to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`}
                className="badge bg-warning text-dark ms-1"
              >
                {skill.trim()}
              </Link>
            ))}
          </p>
          <p className="fw-bold">
            Recent Course: <Link to="/teacher-detail/1">Geology</Link>
          </p>
          <p className="fw-bold">Rating: 4.5/5</p>
        </div>
      </div>
      {/* Course Videos */}
      <div className="card mt-4">
        <h5 className="card-header">Course List</h5>
        <div className="list-group list-group-flush">
          {courseData.map((course, index) => (
            <Link
              to={`/detail/${course.id}`}
              className="list-group-item list-group-item-action"
            >
              {course.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherDetail;
