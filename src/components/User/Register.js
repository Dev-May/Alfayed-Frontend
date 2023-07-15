import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api/student/";
function Register() {
  const [studentData, setstudentData] = useState({
    full_name: "",
    mobile_no: "",
    parent_number: "",
    address: "",
    grade: "",
    password: "",
    confirm_password: "",
    profile_img: "",
    interested_categories: "",
    status: "",
  });

  // Change Element value
  const handleChange = (event) => {
    setstudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };
  // End

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setstudentData({
      ...studentData,
      profile_img: file,
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
    studentFormData.append("password", studentData.password);
    studentFormData.append("confirm_password", studentData.confirm_password);
    studentFormData.append("profile_img", studentData.profile_img);
    studentFormData.append(
      "interested_categories",
      studentData.interested_categories
    );

    try {
      axios.post(baseUrl, studentFormData).then((response) => {
        if (response.status == 200 || response.status == 201) {
          Swal.fire({
            title: "تم التسجيل بنجاح",
            icon: "success",
            toast: true,
            timer: 5000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
          //   window.location.reload();
        }
        setstudentData({
          full_name: "",
          mobile_no: "",
          parent_number: "",
          address: "",
          grade: "",
          password: "",
          confirm_password: "",
          profile_img: "",
          interested_categories: "",
          status: "success",
        });
      });
    } catch (error) {
      console.log(error);
      setstudentData({ status: error });
    }
  };
  // End

  useEffect(() => {
    document.title = "انشاء حساب طالب";
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          {studentData.status == "success" && (
            <p className="text-success">شكراً لتسجيلك</p>
          )}
          {studentData.status == "error" && (
            <p className="text-danger">حدث خطأ ما!!</p>
          )}
          <div className="card">
            <h5 className="card-header text-center">إنشاء حساب طالب</h5>
            <div className="card-body">
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  الاسم بالكامل :
                </label>
                <input
                  value={studentData.full_name}
                  type="text"
                  name="full_name"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  رقم الهاتف :
                </label>
                <input
                  value={studentData.mobile_no}
                  onChange={handleChange}
                  type="number"
                  name="mobile_no"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  رقم ولي الأمر :
                </label>
                <input
                  value={studentData.parent_number}
                  onChange={handleChange}
                  type="number"
                  name="parent_number"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  العنوان :
                </label>
                <input
                  value={studentData.address}
                  onChange={handleChange}
                  name="address"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  إختر الصف الدراسي :
                </label>
                <select
                  value={studentData.grade}
                  onChange={handleChange}
                  name="grade"
                  className="form-select"
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
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  الرقم السري الخاص بك :
                </label>
                <input
                  value={studentData.password}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  ادخل الرقم السري للتأكيد :
                </label>
                <input
                  value={studentData.confirm_password}
                  type="password"
                  name="confirm_password"
                  onChange={handleChange}
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3">
                <label for="video" className="form-label">
                  صورة الملف الشخصي :
                </label>
                <input
                  value={studentData.profile_img.url}
                  onChange={handleFileChange}
                  name="profile_img"
                  type="file"
                  className="form-control"
                  id="video"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  المقررات المفضلة :
                </label>
                <textarea
                  value={studentData.interested_categories}
                  onChange={handleChange}
                  name="interested_categories"
                  className="form-control"
                ></textarea>
                <div id="emailHelp" class="form-text">
                  الكيمياء, الفيزياء, الرياضيات, إلخ
                </div>
              </div>
              <button
                type="submit"
                onClick={submitForm}
                className="btn btn-primary"
              >
                إنشاء حساب
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
