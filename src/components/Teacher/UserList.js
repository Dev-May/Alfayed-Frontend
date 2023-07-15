import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import MessageList from "./MessageList";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function UserList() {
  const [StudentData, setStudentData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");
  // Fetch students when page load
  useEffect(() => {
    try {
      axios
        .get(baseUrl + "/fetch-all-enrolled-students/" + teacherId)
        .then((res) => {
          setStudentData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Send Message
  const [groupMsgData, setgroupMsgData] = useState({
    msg_text: "",
  });
  const [groupsuccessMsg, setgroupsuccessMsg] = useState("");
  const [grouperrorMsg, setgrouperrorMsg] = useState("");

  // Send Message
  const [msgData, setmsgData] = useState({
    msg_text: "",
  });

  const [successMsg, setsuccessMsg] = useState("");
  const [errorMsg, seterrorMsg] = useState("");

  const handleChange = (event) => {
    setmsgData({
      ...msgData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = (student_id) => {
    const _formData = new FormData();
    _formData.append("msg_text", msgData.msg_text);
    _formData.append("msg_from", "teacher");

    try {
      axios
        .post(
          baseUrl + "/send-message/" + teacherId + "/" + student_id,
          _formData
        )
        .then((res) => {
          if (res.data.bool == true) {
            setmsgData({
              msg_text: "",
            });
            setsuccessMsg(res.data.msg);
            seterrorMsg("");
          } else {
            setsuccessMsg("");
            seterrorMsg(res.data.msg);
          }
          // End SweetAlert
        });
    } catch (error) {
      console.log(error);
    }
  };
  // End Send Message

  const grouphandleChange = (event) => {
    setgroupMsgData({
      ...groupMsgData,
      [event.target.name]: event.target.value,
    });
  };

  // Group Send Message
  const groupformSubmit = () => {
    const _formData = new FormData();
    _formData.append("msg_text", groupMsgData.msg_text);
    _formData.append("msg_from", "teacher");

    try {
      axios
        .post(baseUrl + "/send-group-message/" + teacherId, _formData)
        .then((res) => {
          if (res.data.bool == true) {
            setgroupMsgData({
              msg_text: "",
            });
            setgroupsuccessMsg(res.data.msg);
            setgrouperrorMsg("");
          } else {
            setgroupsuccessMsg("");
            setgrouperrorMsg(res.data.msg);
          }
          // End SweetAlert
        });
    } catch (error) {
      console.log(error);
    }
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
              الطلبة المشتركين
              <button
                type="button"
                className="btn btn-primary float-end btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#groupMsgModal"
              >
                إرسال رسالة
              </button>
            </h5>
            {/* Modal */}
            <div
              className="modal fade"
              id="groupMsgModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      إرسال رسالة لجميع الطلاب
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    {groupsuccessMsg && (
                      <p className="text-success">{groupsuccessMsg}</p>
                    )}
                    {grouperrorMsg && (
                      <p className="text-danger">{grouperrorMsg}</p>
                    )}
                    <form>
                      <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                          الرسالة
                        </label>
                        <textarea
                          onChange={grouphandleChange}
                          value={groupMsgData.msg_text}
                          name="msg_text"
                          className="form-control"
                          rows="15"
                        ></textarea>
                      </div>
                      <button
                        type="button"
                        onClick={groupformSubmit}
                        className="btn btn-primary"
                      >
                        إرسال
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>اسم الطالب</th>
                    <th>رقم التليفون</th>
                    <th>رقم ولى الأمر</th>
                    <th>الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {StudentData.map((row, index) => (
                    <tr>
                      <td>{row.student.full_name}</td>
                      <td>{row.student.mobile_no}</td>
                      <td>{row.student.parent_number}</td>
                      <td>
                        <Link
                          to={`/add-assignment/${row.student.id}/${teacherId}`}
                          className="btn btn-sm btn-success ms-2"
                        >
                          إضافة إشعار
                        </Link>
                        <Link
                          to={`/show-assignment/${row.student.id}/${teacherId}`}
                          className="btn btn-sm btn-warning ms-2"
                        >
                          الإشعارات
                        </Link>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target={`#msgModal${index}`}
                          className="btn btn-primary btn-sm"
                          title="إرسال رسالة"
                        >
                          إرسال رسالة
                        </button>

                        {/* Message Modal */}
                        <div
                          className="modal fade"
                          id={`msgModal${index}`}
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-fullscreen">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  <span className="text-danger">
                                    {row.student.full_name}
                                  </span>
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <div className="row">
                                  <div className="col-md-7 mb-2 col-12 border-end">
                                    <MessageList
                                      teacher_id={teacherId}
                                      student_id={row.student.id}
                                    />
                                  </div>
                                  <div className="col-md-4 col-12">
                                    {successMsg && (
                                      <p className="text-success">
                                        {successMsg}
                                      </p>
                                    )}
                                    {errorMsg && (
                                      <p className="text-danger">{errorMsg}</p>
                                    )}
                                    <form>
                                      <div className="mb-3">
                                        <label
                                          for="exampleInputEmail1"
                                          className="form-label"
                                        >
                                          الرسالة
                                        </label>
                                        <textarea
                                          onChange={handleChange}
                                          value={msgData.msg_text}
                                          name="msg_text"
                                          className="form-control"
                                          rows="15"
                                        ></textarea>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          formSubmit(row.student.id)
                                        }
                                        className="btn btn-primary"
                                      >
                                        إرسال
                                      </button>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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

export default UserList;
