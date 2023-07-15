import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function StudyMaterials() {
  const [studyData, setstudyData] = useState([]);
  const [totalResult, settotalResult] = useState(0);
  const { course_id } = useParams();
  // Fetch courses when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + "/study-materials/" + course_id).then((res) => {
        settotalResult(res.data.length);
        setstudyData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const downloadFile = (file_url) => {
    window.location.href = file_url;
  };

  // Delete Data
  const handleDeleteClick = (study_id) => {
    Swal.fire({
      title: "تأكيد",
      text: "هل انت متاكد انك تريد مسح هذه البيانات؟",
      icon: "info",
      confirmButtonText: "إستمرار",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(baseUrl + "/study-material/" + study_id).then((res) => {
            Swal.fire("success", "تم مسح البيانات بنجاح");
            try {
              axios
                .get(baseUrl + "/study-materials/" + course_id)
                .then((res) => {
                  settotalResult(res.data.length);
                  setstudyData(res.data);
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
              جميع المواد الدراسية ({totalResult}){" "}
              <Link
                className="btn btn-success btn-sm float-end"
                to={`/add-study/` + course_id}
              >
                إضافة مواد دراسية
              </Link>
            </h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>اسم المذكرة</th>
                    <th>تحميل</th>
                    <th>ملاحظات</th>
                    <th>الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {studyData.map((row, index) => (
                    <tr>
                      <td>{row.title}</td>
                      <td>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => downloadFile(row.upload)}
                        >
                          تنزيل الملف
                        </button>
                      </td>
                      <td>{row.remarks}</td>
                      <td>
                        {/* <button
                          onClick={() => handleDeleteClick(row.id)}
                          className="btn btn-sm btn-danger ms-1"
                        >
                          <i class="bi bi-trash"></i>
                        </button> */}
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDeleteClick(row.id)}
                        >
                          مسح{" "}
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
export default StudyMaterials;
