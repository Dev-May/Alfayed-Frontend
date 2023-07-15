import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function TeacherLogin() {
  const navigate = useNavigate();
  const [teacherLoginData, setteacherLoginData] = useState({
    mobile_no: "",
    password: "",
  });

  const [errorMsg, seterrorMsg] = useState("");

  const handleChange = (event) => {
    setteacherLoginData({
      ...teacherLoginData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = () => {
    const teacherFormData = new FormData();
    teacherFormData.append("mobile_no", teacherLoginData.mobile_no);
    teacherFormData.append("password", teacherLoginData.password);
    try {
      axios.post(baseUrl + "/teacher-login", teacherFormData).then((res) => {
        if (res.data.bool === true) {
          if (res.data.login_via_otp === true) {
            navigate("/verify-teacher/" + res.data.teacher_id);
          } else {
            localStorage.setItem("teacherLoginStatus", true);
            localStorage.setItem("teacherId", res.data.teacher_id);
            navigate("/teacher-dashboard");
          }
        } else {
          seterrorMsg(res.data.msg);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus == "true") {
    window.location.href = "/teacher-dashboard";
  }

  useEffect(() => {
    document.title = "تسجيل دخول مدرس";
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">تسجيل دخول مدرس</h5>
            <div className="card-body">
              {errorMsg && <p className="text-danger">{errorMsg}</p>}
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  رقم الهاتف
                </label>
                <input
                  type="number"
                  value={teacherLoginData.mobile_no}
                  name="mobile_no"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  الرقم السرى الخاص بك
                </label>
                <input
                  type="password"
                  value={teacherLoginData.password}
                  name="password"
                  onChange={handleChange}
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              {/* <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                            </div> */}
              <button
                type="submit"
                onClick={submitForm}
                className="btn btn-primary"
              >
                تسجيل الدخول
              </button>
              <p className="mt-3">
                <Link to="/teacher-forgot-password" className="text-danger">
                  نسيت كلمة السر؟
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherLogin;
