import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";
function EditChapter() {
  const [chapterData, setChapterData] = useState({
    course: "",
    title: "",
    description: "",
    prev_video: "",
    video: "",
    remarks: "",
  });
  const [videoDuration, setvideoDuration] = useState();

  const handleChange = (event) => {
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
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setChapterData({
      ...chapterData,
      [event.target.name]: event.target.files[0],
    });
  };

  const { chapter_id } = useParams();
  const formSubmit = () => {
    const _formData = new FormData();
    _formData.append("course", chapterData.course);
    _formData.append("title", chapterData.title);
    _formData.append("description", chapterData.description);
    if (chapterData.video !== "") {
      _formData.append("video", chapterData.video, chapterData.video.name);
      _formData.append("video_duration", videoDuration);
    }
    _formData.append("remarks", chapterData.remarks);

    try {
      axios
        .put(baseUrl + "/chapter/" + chapter_id, _formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            Swal.fire({
              title: "تم تحديث البيانات بنجاح",
              icon: "success",
              toast: true,
              timer: 5000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
          // window.location.href='/edit-chapter/1';
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch courses when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + "/chapter/" + chapter_id).then((res) => {
        setChapterData({
          course: res.data.course.id,
          title: res.data.title,
          description: res.data.description,
          prev_video: res.data.video,
          remarks: res.data.remarks,
          video: "",
        });
        setvideoDuration(res.data.video_duration);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <div className="col-9">
          <div className="card">
            <h5 className="card-header">تحديث بيانات المحاضرة</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label for="title" className="form-label">
                    اسم المحاضرة
                  </label>
                  <input
                    type="text"
                    value={chapterData.title}
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
                    value={chapterData.description}
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
                  {chapterData.prev_video && (
                    <video controls width="100%" height="240" className="mt-2">
                      <source src={chapterData.prev_video} type="video/mp4" />
                    </video>
                  )}
                </div>
                <div className="mb-3">
                  <label for="techs" className="form-label">
                    ملاحظات
                  </label>
                  <textarea
                    onChange={handleChange}
                    value={chapterData.remarks}
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
                  تحديث
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditChapter;
