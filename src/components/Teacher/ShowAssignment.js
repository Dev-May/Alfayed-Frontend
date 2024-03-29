import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function ShowAssignment() {
  const [assignmentData, setassignmentData] = useState([]);
  const [totalResult, settotalResult] = useState(0);
  const { student_id } = useParams();
  const { teacher_id } = useParams();
  // Fetch courses when page load
  useEffect(() => {
    try {
      axios
        .get(baseUrl + "/student-assignment/" + teacher_id + "/" + student_id)
        .then((res) => {
          settotalResult(res.data.length);
          setassignmentData(res.data);
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
            <h5 className="card-header">
              جميع الإشعارات ({totalResult}){" "}
              <Link
                className="btn btn-success btn-sm float-end"
                to={`/add-assignment/${student_id}/${teacher_id}`}
              >
                إضافة إشعار
              </Link>
            </h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>عنوان الإشعار</th>
                    <th>حالة الإشعار</th>
                  </tr>
                </thead>
                <tbody>
                  {assignmentData.map((row, index) => (
                    <tr>
                      <td>{row.title}</td>
                      <td>
                        {row.student_status == false && (
                          <span className="badge bg-warning">قيد التسليم</span>
                        )}
                        {row.student_status == true && (
                          <span className="badge bg-success">
                            تم إستلام الإشعار
                          </span>
                        )}
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
export default ShowAssignment;
