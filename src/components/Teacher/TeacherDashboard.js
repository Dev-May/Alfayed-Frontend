import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";
function TeacherDashboard() {
  const [dashbardData, setdashbardData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");
  useEffect(() => {
    // Fetch Courses
    try {
      axios.get(baseUrl + "/teacher/dashboard/" + teacherId).then((res) => {
        console.log(res);
        setdashbardData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="container mt-4 text-center">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="row">
            <div className="col-md-4">
              <div className="card border-primary">
                <h5 className="card-header bg-primary text-white">
                  إجمالى الكورسات
                </h5>
                <div className="card-body">
                  <h3>
                    <Link className="link-style" to="/teacher-courses">
                      {dashbardData.total_teacher_courses}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-success">
                <h5 className="card-header bg-success text-white">
                  إجمالى الطلبة المشتركين
                </h5>
                <div className="card-body">
                  <h3>
                    <Link className="link-style" to="/teacher-users">
                      {dashbardData.total_teacher_students}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-info">
                <h5 className="card-header bg-info text-white">
                  إجمالى المحاضرات
                </h5>
                <div className="card-body">
                  <h3>
                    <Link className="link-style" to="/teacher-courses">
                      {dashbardData.total_teacher_chapters}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherDashboard;
