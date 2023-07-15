import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function MyCourses() {
  const [courseData, setCourseData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");
  console.log(`teacherId: ${teacherId}`);
  // Fetch courses when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + "/teacher-courses/" + teacherId).then((res) => {
        setCourseData(res.data);
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
          <div className="card">
            <h5 className="card-header">جميع الكورسات</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>اسم الكورس</th>
                    <th>صورة الغلاف</th>
                    <th>الطلبة المشتركين</th>
                    <th>الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {courseData.map((course, index) => (
                    <tr>
                      <td>
                        <Link
                          className="link-style"
                          to={`/all-chapters/` + course.id}
                        >
                          {course.title}
                        </Link>
                        <hr />
                        {course.course_rating && (
                          <span>تقييم الكورس: {course.course_rating}/5</span>
                        )}
                      </td>
                      <td>
                        <img
                          src={course.featured_img}
                          width="80"
                          className="rounded"
                          alt={course.title}
                        />
                      </td>
                      <td>
                        <Link
                          className="link-style"
                          to={`/enrolled-students/` + course.id}
                        >
                          {course.total_enrolled_students}
                        </Link>
                      </td>
                      <td>
                        <Link
                          className="btn btn-info btn-sm mb-2 ms-2"
                          to={`/edit-course/` + course.id}
                        >
                          تحديث
                        </Link>
                        <Link
                          className="btn btn-primary btn-sm mb-2 ms-2"
                          to={`/study-materials/` + course.id}
                        >
                          المذكرات
                        </Link>
                        <Link
                          className="btn btn-success btn-sm mb-2 ms-2"
                          to={`/add-chapter/` + course.id}
                        >
                          إضافة محاضرة
                        </Link>
                        <Link
                          className="btn btn-warning btn-sm mb-2 ms-2"
                          to={`/assign-quiz/` + course.id}
                        >
                          الإختبارات
                        </Link>
                        <button className="btn btn-danger btn-sm mb-2 ms-2">
                          مسح
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyCourses;
