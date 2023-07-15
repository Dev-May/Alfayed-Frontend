import TeacherSidebar from "./TeacherSidebar";
import { useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function AddQuiz() {
  const [quizData, setquizData] = useState({
    title: "",
    detail: "",
  });

  const handleChange = (event) => {
    setquizData({
      ...quizData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = () => {
    const teacherId = localStorage.getItem("teacherId");
    const _formData = new FormData();
    _formData.append("teacher", teacherId);
    _formData.append("title", quizData.title);
    _formData.append("detail", quizData.detail);

    try {
      axios.post(baseUrl + "/quiz/", _formData, {}).then((res) => {
        // console.log(res.data);
        window.location.href = "/add-quiz";
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <div className="col-9">
          <div className="card">
            <h5 className="card-header text-center">إضافة إختبار</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label for="title" className="form-label">
                    اسم الإختبار
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="title"
                    id="title"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="description" className="form-label">
                    الوصف
                  </label>
                  <textarea
                    onChange={handleChange}
                    name="detail"
                    className="form-control"
                    id="description"
                  ></textarea>
                </div>
                <button
                  type="button"
                  onClick={formSubmit}
                  className="btn btn-primary"
                >
                  إضافة
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuiz;
