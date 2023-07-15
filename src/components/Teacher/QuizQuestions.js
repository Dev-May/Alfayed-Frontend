import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function QuizQuestions() {
  const [questionData, setquestionData] = useState([]);
  const [totalResult, settotalResult] = useState(0);
  const { quiz_id } = useParams();
  // Fetch courses when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + "/quiz-questions/" + quiz_id).then((res) => {
        settotalResult(res.data.length);
        setquestionData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Delete Data
  const handleDeleteClick = (question_id) => {
    Swal.fire({
      title: "تأكيد",
      text: "هل انت متأكد انك تريد مسح هذه البيانات؟",
      icon: "info",
      confirmButtonText: "إستمرار",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(baseUrl + "/question/" + question_id).then((res) => {
            Swal.fire("success", "تم مسح البيانات بنجاح");
            try {
              axios.get(baseUrl + "/quiz-questions/" + quiz_id).then((res) => {
                settotalResult(res.data.length);
                setquestionData(res.data);
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
            <h5 className="card-header">
              جميع الأسئلة ({totalResult}){" "}
              <Link
                className="btn btn-success btn-sm float-end"
                to={`/add-quiz-question/` + quiz_id}
              >
                إضافة سؤال
              </Link>
            </h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>السؤال</th>
                    <th>الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {questionData.map((row, index) => (
                    <tr>
                      <td>
                        <Link to={`/edit-question/` + row.id}>
                          {row.questions}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/edit-question/` + row.id}
                          className="btn btn-sm text-white btn-info ms-2"
                        >
                          <i class="bi bi-pencil-square"></i>
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(row.id)}
                          className="btn btn-sm btn-danger ms-1"
                        >
                          <i class="bi bi-trash"></i>
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
export default QuizQuestions;
