import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div className="card text-center">
      <div className="list-group list-group-flush">
        <Link
          to="/teacher-dashboard"
          className="list-group-item list-group-item-action"
        >
          لوحة التحكم
        </Link>
        <Link
          to="/teacher-courses"
          className="list-group-item list-group-item-action"
        >
          جميع الكورسات
        </Link>
        <Link
          to="/add-course"
          className="list-group-item list-group-item-action"
        >
          إضافة كورس
        </Link>
        <Link
          to="/teacher-users"
          className="list-group-item list-group-item-action"
        >
          الطلبة المشتركين
        </Link>
        <Link to="/quiz" className="list-group-item list-group-item-action">
          الإختبارات
        </Link>
        <Link to="/add-quiz" className="list-group-item list-group-item-action">
          إضافة إختبار
        </Link>
        <Link
          to="/teacher-profile-setting"
          className="list-group-item list-group-item-action"
        >
          إعدادات الحساب
        </Link>
        <Link
          to="/teacher-change-password"
          className="list-group-item list-group-item-action"
        >
          تغيير كلمة السر
        </Link>
        <Link
          to="/teacher-logout"
          className="list-group-item list-group-item-action text-danger"
        >
          تسجيل الخروج
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
