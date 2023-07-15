import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";
function ProfileSetting() {
  const [teacherData, setteacherData] = useState({
    full_name: "",
    mobile_no: "",
    address: "",
    bio: "",
    profile_img: "",
    p_img: "",
    skills: "",
    status: "",
    login_via_otp: "",
    facebook_url: "",
  });
  const teacherId = localStorage.getItem("teacherId");
  // Fetch categories when page load
  useEffect(() => {
    // Fetch current teacher data
    try {
      axios.get(baseUrl + "/teacher/" + teacherId).then((res) => {
        setteacherData({
          full_name: res.data.full_name,
          mobile_no: res.data.mobile_no,
          address: res.data.address,
          bio: res.data.bio,
          profile_img: res.data.profile_img,
          p_img: "",
          skills: res.data.skills,
          login_via_otp: res.data.login_via_otp,
          facebook_url: res.data.facebook_url,
        });
      });
    } catch (error) {
      console.log(error);
    }
    // End
  }, []);

  // Change Element value
  const handleChange = (event) => {
    setteacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };
  // End

  const handleFileChange = (event) => {
    setteacherData({
      ...teacherData,
      [event.target.name]: event.target.files[0],
    });
  };

  // Submit Form
  const submitForm = () => {
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", teacherData.full_name);
    teacherFormData.append("mobile_no", teacherData.mobile_no);
    teacherFormData.append("address", teacherData.address);
    teacherFormData.append("bio", teacherData.bio);

    if (teacherData.p_img !== "") {
      teacherFormData.append(
        "profile_img",
        teacherData.p_img,
        teacherData.p_img.name
      );
    }

    teacherFormData.append("skills", teacherData.skills);
    teacherFormData.append("login_via_otp", teacherData.login_via_otp);
    teacherFormData.append("facebook_url", teacherData.facebook_url);

    try {
      axios
        .put(baseUrl + "/teacher/" + teacherId + "/", teacherFormData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status == 200) {
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
        });
    } catch (error) {
      console.log(error);
      setteacherData({ status: "error" });
    }
  };
  // End

  useEffect(() => {
    document.title = "الصفحة الشخصية";
  });

  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus != "true") {
    window.location.href = "/teacher-login";
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">إعدادات الحساب</h5>
            <div className="card-body">
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  الاسم بالكامل
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="full_name"
                    value={teacherData.full_name}
                    onChange={handleChange}
                    class="form-control"
                    id="staticEmail"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  رقم الهاتف
                </label>
                <div class="col-sm-10">
                  <input
                    type="number"
                    name="mobile_no"
                    value={teacherData.mobile_no}
                    onChange={handleChange}
                    class="form-control"
                    id="staticEmail"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="staticEmail" className="col-sm-2 col-form-label">
                  العنوان
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="address"
                    value={teacherData.address}
                    onChange={handleChange}
                    className="form-control"
                    id="staticEmail"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="staticEmail" className="col-sm-2 col-form-label">
                  السيرة الذاتية
                </label>
                <div class="col-sm-10">
                  <textarea
                    value={teacherData.bio}
                    onChange={handleChange}
                    name="bio"
                    className="form-control"
                    id="staticEmail"
                  ></textarea>
                </div>
              </div>
              <div className="mb-3 row">
                <label for="video" class="col-sm-2 col-form-label">
                  صورة الملف الشخصي
                </label>
                <div class="col-sm-10">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    name="p_img"
                    id="video"
                    className="form-control"
                  />
                  {teacherData.profile_img && (
                    <p className="mt-2">
                      <img
                        src={teacherData.profile_img}
                        width="300"
                        alt={teacherData.full_name}
                      />
                    </p>
                  )}
                </div>
              </div>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  المواد العلمية
                </label>
                <div class="col-sm-10">
                  <textarea
                    className="form-control"
                    name="skills"
                    value={teacherData.skills}
                    onChange={handleChange}
                  ></textarea>
                  <div id="emailHelp" class="form-text">
                    الكيمياء, الفيزياء, الرياضيات, إلخ
                  </div>
                </div>
              </div>
              {/* <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  Login Via OTP
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="login_via_otp"
                    value={teacherData.login_via_otp}
                    onChange={handleChange}
                    class="form-control"
                    id="staticEmail"
                  />
                </div>
              </div> */}
              <hr />
              <h4 className="my-4">رابط حساب الفيس بوك</h4>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  فيس بوك
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="facebook_url"
                    value={teacherData.facebook_url}
                    onChange={handleChange}
                    class="form-control"
                    id="staticEmail"
                  />
                </div>
              </div>
              <button className="btn btn-primary" onClick={submitForm}>
                تحديث البيانات الشخصية
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfileSetting;
