import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";
function ProfileSetting() {
  const [studentData, setstudentData] = useState({
    full_name: "",
    mobile_no: "",
    parent_number: "",
    address: "",
    grade: "",
    profile_img: "",
    p_img: "",
    interested_categories: "",
  });
  const studentId = localStorage.getItem("studentId");
  // Fetch categories when page load
  useEffect(() => {
    // Fetch current teacher data
    try {
      axios.get(baseUrl + "/student/" + studentId).then((res) => {
        setstudentData({
          full_name: res.data.full_name,
          mobile_no: res.data.mobile_no,
          parent_number: res.data.parent_number,
          address: res.data.address,
          grade: res.data.grade,
          profile_img: res.data.profile_img,
          p_img: "",
          interested_categories: res.data.interested_categories,
        });
      });
    } catch (error) {
      console.log(error);
    }
    // End
  }, []);

  // Change Element value
  const handleChange = (event) => {
    setstudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };
  // End

  const handleFileChange = (event) => {
    setstudentData({
      ...studentData,
      [event.target.name]: event.target.files[0],
    });
  };

  // Submit Form
  const submitForm = () => {
    const studentFormData = new FormData();
    studentFormData.append("full_name", studentData.full_name);
    studentFormData.append("mobile_no", studentData.mobile_no);
    studentFormData.append("parent_number", studentData.parent_number);
    studentFormData.append("address", studentData.address);
    studentFormData.append("grade", studentData.grade);

    if (studentData.p_img !== "") {
      studentFormData.append(
        "profile_img",
        studentData.p_img,
        studentData.p_img.name
      );
    }

    studentFormData.append(
      "interested_categories",
      studentData.interested_categories
    );

    try {
      axios
        .put(baseUrl + "/student/" + studentId + "/", studentFormData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              title: "تم تحديث البيانات بنجاح",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        });
    } catch (error) {
      console.log(error);
      setstudentData({ status: "error" });
    }
  };
  // End

  useEffect(() => {
    document.title = "الصفحة الشخصية";
  });

  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  if (studentLoginStatus != "true") {
    window.location.href = "/user-login";
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header text-center">إعدادات الحساب</h5>
            <div className="card-body">
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  الاسم بالكامل
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="full_name"
                    value={studentData.full_name}
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
                    value={studentData.mobile_no}
                    type="number"
                    name="mobile_no"
                    onChange={handleChange}
                    className="form-control"
                    id="staticEmail"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  رقم ولى الأمر
                </label>
                <div class="col-sm-10">
                  <input
                    value={studentData.parent_number}
                    type="number"
                    name="parent_number"
                    onChange={handleChange}
                    className="form-control"
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
                    value={studentData.address}
                    onChange={handleChange}
                    name="address"
                    type="text"
                    className="form-control"
                    id="staticEmail"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="staticEmail" className="col-sm-2 col-form-label">
                  إختر الصف الدراسي
                </label>
                <div class="col-sm-10">
                  <select
                    value={studentData.grade}
                    onChange={handleChange}
                    name="grade"
                    className="form-select"
                    id="staticEmail"
                  >
                    <option className="text-dark" value="1">
                      الصف الأول الثانوي
                    </option>
                    <option className="text-dark" value="2">
                      الصف الثاني الثانوي
                    </option>
                    <option className="text-dark" value="3">
                      الصف الثالث الثانوي
                    </option>
                  </select>
                </div>
              </div>
              <div className="mb-3 row">
                <label for="video" class="col-sm-2 col-form-label">
                  صورة الملف الشخصى
                </label>
                <div class="col-sm-10">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    name="p_img"
                    id="video"
                    className="form-control"
                  />
                  {studentData.profile_img && (
                    <p className="mt-2">
                      <img
                        src={studentData.profile_img}
                        width="300"
                        alt={studentData.full_name}
                      />
                    </p>
                  )}
                </div>
              </div>
              <div class="mb-3 row">
                <label
                  for="staticEmail"
                  name="interested_categories"
                  class="col-sm-2 col-form-label"
                >
                  المقررات المفضلة
                </label>
                <div class="col-sm-10">
                  <textarea
                    className="form-control"
                    name="interested_categories"
                    value={studentData.interested_categories}
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
                    value={studentData.login_via_otp}
                    onChange={handleChange}
                    class="form-control"
                    id="staticEmail"
                  />
                </div>
              </div> */}
              <hr />
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
