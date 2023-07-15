import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function Sidebar() {
  const [notifData, setnotifData] = useState([]);
  const studentId = localStorage.getItem("studentId");
  useEffect(() => {
    // Fetch Courses
    try {
      axios
        .get(baseUrl + "/student/fetch-all-notifications/" + studentId)
        .then((res) => {
          console.log(res);
          setnotifData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="card text-center">
      <div className="list-group list-group-flush">
        <Link
          to="/user-dashboard"
          className="list-group-item list-group-item-action"
        >
          لوحة التحكم
        </Link>
        <Link
          to="/my-courses"
          className="list-group-item list-group-item-action"
        >
          المقررات التى تم الإشتراك بها
        </Link>
        <Link
          to="/my-teachers"
          className="list-group-item list-group-item-action"
        >
          مقدمى المادة العلمية
        </Link>
        <Link
          to="/favorite-courses"
          className="list-group-item list-group-item-action"
        >
          المقررات المفضلة
        </Link>
        {/* <Link
          to="/recommended-courses"
          className="list-group-item list-group-item-action"
        >
          المقررات الموصى بها
        </Link> */}
        <Link
          to="/my-assignments"
          className="list-group-item list-group-item-action"
        >
          الإشعارات{" "}
          <span className="float-end badge bg-danger mt-1">
            {notifData.length}
          </span>
        </Link>
        <Link
          to="/profile-setting"
          className="list-group-item list-group-item-action"
        >
          إعدادات الحساب
        </Link>
        <Link
          to="/change-password"
          className="list-group-item list-group-item-action"
        >
          تغيير كلمة السر
        </Link>
        <Link
          to="/user-logout"
          className="list-group-item list-group-item-action text-danger"
        >
          تسجيل الخروج
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
