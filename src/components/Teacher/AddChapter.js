import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";
function AddChapter() {
  const [chapterData, setChapterData] = useState({
    title: "",
    description: "",
    video: "",
    remarks: "",
  });
  const [videoDuration, setvideoDuration] = useState();

  const handleChange = (event) => {
    setChapterData({
      ...chapterData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    window.URL = window.URL || window.webkitURL;
    var video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src);
      setvideoDuration(video.duration);
      // alert("Duration : " + video.duration + " seconds");
    };
    video.src = URL.createObjectURL(event.target.files[0]);

    setChapterData({
      ...chapterData,
      [event.target.name]: event.target.files[0],
    });
  };

  const { course_id } = useParams();

  const formSubmit = () => {
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("title", chapterData.title);
    _formData.append("description", chapterData.description);
    _formData.append("video", chapterData.video, chapterData.video.name);
    _formData.append("video_duration", videoDuration);
    _formData.append("remarks", chapterData.remarks);

    try {
      axios
        .post(baseUrl + "/course-chapters/" + course_id, _formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Swal.fire({
              title: "تمت إضافة البيانات بنجاح",
              icon: "success",
              toast: true,
              timer: 5000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "إضافة محاضرة";
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <div className="col-9">
          <div className="card">
            <h5 className="card-header text-center">إضافة محاضرة</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label for="title" className="form-label">
                    اسم المحاضرة
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
                    وصف المحاضرة
                  </label>
                  <textarea
                    className="form-control"
                    onChange={handleChange}
                    name="description"
                    id="description"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label for="video" className="form-label">
                    فيديو
                  </label>
                  <input
                    type="file"
                    id="video"
                    onChange={handleFileChange}
                    name="video"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="techs" className="form-label">
                    ملاحظات
                  </label>
                  <textarea
                    onChange={handleChange}
                    name="remarks"
                    className="form-control"
                    placeholder="هذه المحاضرة تركز على..."
                    id="techs"
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

export default AddChapter;
