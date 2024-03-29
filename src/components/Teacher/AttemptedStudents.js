import TeacherSidebar from "./TeacherSidebar";
import QuizResult from "./QuizResult";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function AttemptedStudents() {
  const [studentData, setstudentData] = useState([]);
  const { quiz_id } = useParams();
  // Fetch courses when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + "/attempted-quiz/" + quiz_id).then((res) => {
        setstudentData(res.data);
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
            <h5 className="card-header">الطلبة المشاركين</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>اسم الطالب</th>
                    <th>رقم الهاتف</th>
                    <th>رقم ولى الامر</th>
                    <th>نتيجة الطالب</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((row, index) => (
                    <tr>
                      <td>{row.student.full_name}</td>
                      <td>{row.student.mobile_no}</td>
                      <td>{row.student.parent_number}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-primary btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target={`#resultModal${row.id}`}
                        >
                          نتيجة الإختبار
                        </button>

                        <div
                          className="modal fade"
                          id={`resultModal${row.id}`}
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <QuizResult
                            quiz={row.quiz.id}
                            student={row.student.id}
                          />
                        </div>
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

export default AttemptedStudents;
