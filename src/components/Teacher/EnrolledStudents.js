import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function EnrolledStudents() {
  const [StudentData, setStudentData] = useState([]);

  let { course_id } = useParams();
  // Fetch courses when page load
  useEffect(() => {
    try {
      axios
        .get(baseUrl + "/fetch-enrolled-students/" + course_id)
        .then((res) => {
          setStudentData(res.data);
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
            <h5 className="card-header">الطلبة المشتركين</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>اسم الطالب</th>
                    <th>رقم الهاتف</th>
                    <th>رقم ولى الأمر</th>
                    <th>العنوان</th>
                  </tr>
                </thead>
                <tbody>
                  {StudentData.map((row, index) => (
                    <tr>
                      <td>{row.student.full_name}</td>
                      <td>{row.student.mobile_no}</td>
                      <td>{row.student.parent_number}</td>
                      <td>{row.student.address}</td>
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

export default EnrolledStudents;
