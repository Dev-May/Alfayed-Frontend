import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api/teacher/";
function TeacherRegister() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [teacherData, setteacherData] = useState({
    full_name: "",
    mobile_no: "",
    address: "",
    bio: "",
    password: "",
    confirm_password: "",
    profile_img: "",
    skills: "",
    status: "",
    otp_digit: "",
    facebook_url: "",
  });
  // Change Element value
  const handleChange = (event) => {
    setteacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };
  // End

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setteacherData({
      ...teacherData,
      profile_img: file,
    });
  };

  // Submit Form
  const submitForm = () => {
    const otp_digit = Math.floor(100000 + Math.random() * 900000);
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", teacherData.full_name);
    teacherFormData.append("mobile_no", teacherData.mobile_no);
    teacherFormData.append("address", teacherData.address);
    teacherFormData.append("bio", teacherData.bio);
    teacherFormData.append("password", teacherData.password);
    teacherFormData.append("confirm_password", teacherData.confirm_password);
    teacherFormData.append("profile_img", teacherData.profile_img);
    teacherFormData.append("skills", teacherData.skills);
    teacherFormData.append("otp_digit", otp_digit);
    teacherFormData.append("facebook_url", teacherData.facebook_url);

    try {
      axios.post(baseUrl, teacherFormData).then((response) => {
        console.log(response.data);
        navigate("/verify-teacher/" + response.data.id);
      });
    } catch (error) {
      console.log(error);
    }
  };
  // End

  useEffect(() => {
    document.title = "إنشاء حساب مدرس";
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          {teacherData.status == "success" && (
            <p className="text-success text-center">شكراً لتسجيلك</p>
          )}
          {teacherData.status == "error" && (
            <p className="text-danger text-center">حدث خطأ ما!!</p>
          )}
          <div className="card">
            <h5 className="card-header text-center py-3">إنشاء حساب مدرس</h5>
            <div className="card-body">
              {/* <form> */}
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  الاسم بالكامل :
                </label>
                <input
                  value={teacherData.full_name}
                  onChange={handleChange}
                  name="full_name"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  رقم الهاتف :
                </label>
                <input
                  value={teacherData.mobile_no}
                  onChange={handleChange}
                  type="number"
                  name="mobile_no"
                  className="form-control"
                />
                {/* {errors.mobile_no && (
                  <p className="text-danger">{errors.mobile_no[0]}</p>
                )} */}
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  العنوان :
                </label>
                <input
                  value={teacherData.address}
                  onChange={handleChange}
                  name="address"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  السيرة الذاتية :
                </label>
                <textarea
                  value={teacherData.bio}
                  onChange={handleChange}
                  name="bio"
                  className="form-control"
                ></textarea>
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  الرقم السري الخاص بك :
                </label>
                <input
                  value={teacherData.password}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  ادخل الرقم السري للتأكيد :
                </label>
                <input
                  value={teacherData.confirm_password}
                  onChange={handleChange}
                  name="confirm_password"
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3">
                <label for="video" className="form-label">
                  صورة الملف الشخصي :
                </label>
                <input
                  value={teacherData.profile_img.url}
                  onChange={handleFileChange}
                  name="profile_img"
                  type="file"
                  className="form-control"
                  id="video"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-labe">
                  المواد العلمية :
                </label>
                <textarea
                  value={teacherData.skills}
                  onChange={handleChange}
                  name="skills"
                  className="form-control"
                ></textarea>
                <div id="emailHelp" class="form-text">
                  الكيمياء, الفيزياء, الرياضيات, إلخ
                </div>
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  رابط حساب الفيسبوك :
                </label>
                <input
                  value={teacherData.facebook_url}
                  onChange={handleChange}
                  name="facebook_url"
                  type="text"
                  className="form-control"
                />
              </div>
              <button
                onClick={submitForm}
                type="submit"
                className="btn btn-primary"
              >
                إنشاء حساب
              </button>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherRegister;
