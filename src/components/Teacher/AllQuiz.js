import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";
function AllQuiz() {
  const [quizData, setquizData] = useState([]);
  const [totalResult, settotalResult] = useState(0);
  const teacherId = localStorage.getItem("teacherId");
  // Fetch courses when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + "/teacher-quiz/" + teacherId).then((res) => {
        setquizData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Delete Data
  const handleDeleteClick = (quiz_id) => {
    Swal.fire({
      title: "تأكيد",
      text: "هل انت متاكد انك تريد مسح هذه البيانات؟",
      icon: "info",
      confirmButtonText: "إستمرار",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(baseUrl + "/quiz/" + quiz_id).then((res) => {
            Swal.fire("طلب ناجح", "تم مسح البيانات بنجاح");
            try {
              axios.get(baseUrl + "/teacher-quiz/" + teacherId).then((res) => {
                settotalResult(res.data.length);
                setquizData(res.data);
              });
            } catch (error) {
              console.log(error);
            }
          });
        } catch (error) {
          Swal.fire("خطأ", "لم يتم مسح البيانات!!");
        }
      } else {
        Swal.fire("خطأ", "لم يتم مسح البيانات!!");
      }
    });
  };

  return (
    <div className="container mt-4 text-center">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">جميع الإختبارات</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>الإختبار</th>
                    <th>الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {quizData.map((row, index) => (
                    <tr>
                      <td>
                        <Link
                          className="link-style"
                          to={`/all-questions/` + row.id}
                        >
                          {row.title}
                        </Link>
                      </td>
                      <td>
                        <Link
                          className="btn btn-info btn-sm ms-2"
                          to={`/edit-quiz/` + row.id}
                        >
                          تحديث
                        </Link>
                        <Link
                          className="btn btn-success btn-sm ms-2"
                          to={`/add-quiz-question/` + row.id}
                        >
                          إضافة سؤال
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(row.id)}
                          className="btn btn-danger btn-sm ms-2"
                        >
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

export default AllQuiz;
