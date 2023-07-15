import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function CourseChapters() {
  const [chapterData, setchapterData] = useState([]);
  const [totalResult, settotalResult] = useState(0);
  const { course_id } = useParams();
  // Fetch courses when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + "/course-chapters/" + course_id).then((res) => {
        settotalResult(res.data.length);
        setchapterData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Delete Data
  const handleDeleteClick = (chapter_id) => {
    Swal.fire({
      title: "تأكيد",
      text: "هل انت متأكد انك تريد مسح هذه البيانات",
      icon: "info",
      confirmButtonText: "إستمرار",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(baseUrl + "/chapter/" + chapter_id).then((res) => {
            Swal.fire("طلب ناجح", "تم مسح البيانات بنجاح");
            try {
              axios
                .get(baseUrl + "/course-chapters/" + course_id)
                .then((res) => {
                  settotalResult(res.data.length);
                  setchapterData(res.data);
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
              جميع المحاضرات ({totalResult}){" "}
              <Link
                className="btn btn-success btn-sm float-end"
                to={`/add-chapter/` + course_id}
              >
                إضافة محاضرة
              </Link>
            </h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>اسم المحاضرة</th>
                    <th>فيديو</th>
                    <th>ملاحظات</th>
                    <th>الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {chapterData.map((chapter, index) => (
                    <tr>
                      <td>
                        <Link to={`/edit-chapter/` + chapter.id}>
                          {chapter.title}
                        </Link>
                      </td>
                      <td>
                        <video controls width="250">
                          <source src={chapter.video} type="video/mp4" />
                          <source src={chapter.video} type="video/mkv" />
                        </video>
                      </td>
                      <td>{chapter.remarks}</td>
                      <td>
                        <Link
                          to={`/edit-chapter/` + chapter.id}
                          className="btn btn-sm btn-info ms-2"
                        >
                          تحديث
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(chapter.id)}
                          className="btn btn-sm btn-danger"
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
export default CourseChapters;
