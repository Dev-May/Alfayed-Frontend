import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
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
      axios.get(baseUrl + "/user/study-materials/" + course_id).then((res) => {
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

  return (
    <div className="container mt-4 text-center">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">المذكرات ({totalResult})</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>اسم المذكرة</th>
                    <th>الوصف</th>
                    <th>تنزيل</th>
                    <th>ملاحظات</th>
                  </tr>
                </thead>
                <tbody>
                  {studyData.map((row, index) => (
                    <tr>
                      <td>{row.title}</td>
                      <td>{row.description}</td>
                      <td>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => downloadFile(row.upload)}
                        >
                          تنزيل الملف
                        </button>
                      </td>
                      <td>{row.remarks}</td>
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
