import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function Login() {
  const navigate = useNavigate();
  const [studentLoginData, setstudentLoginData] = useState({
    mobile_no: "",
    password: "",
  });

  const [errorMsg, seterrorMsg] = useState("");

  const handleChange = (event) => {
    setstudentLoginData({
      ...studentLoginData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = () => {
    const StudentFormData = new FormData();
    StudentFormData.append("mobile_no", studentLoginData.mobile_no);
    StudentFormData.append("password", studentLoginData.password);
    try {
      axios.post(baseUrl + "/student-login", StudentFormData).then((res) => {
        if (res.data.bool === true) {
          localStorage.setItem("studentLoginStatus", true);
          localStorage.setItem("studentId", res.data.student_id);
          window.location.href = "/user-dashboard";
        } else seterrorMsg("رقم التليفون او كلمة السر غير صحيحة");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  if (studentLoginStatus === "true") {
    window.location.href = "/user-dashboard";
  }

  useEffect(() => {
    document.title = "تسجيل دخول طالب";
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">تسجيل دخول طالب</h5>
            <div className="card-body">
              {errorMsg && <p className="text-danger">{errorMsg}</p>}
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  رقم الهاتف :
                </label>
                <input
                  type="number"
                  value={studentLoginData.mobile_no}
                  name="mobile_no"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  الرقم السري الخاص بك :
                </label>
                <input
                  type="password"
                  value={studentLoginData.password}
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
                <Link to="/user-forgot-password" className="text-danger">
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

export default Login;
