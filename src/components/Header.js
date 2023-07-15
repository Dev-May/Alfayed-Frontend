import { Link } from "react-router-dom";
import { useState } from "react";
function Header() {
  const [searchString, setsearchString] = useState({
    search: "",
  });
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  const studentLoginStatus = localStorage.getItem("studentLoginStatus");

  const handleChange = (event) => {
    setsearchString({
      ...searchString,
      [event.target.name]: event.target.value,
    });
  };

  const searchCourse = () => {
    if (searchString.search != "") {
      window.location.href = "/search/" + searchString.search;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-brand">
      <div className="container">
        {/* <Link className="navbar-brand ms-3" to="/">
          الـفـايـد
        </Link> */}
        <a href="/">
          <img src="/alfayed logo4.png" width={200} alt="ALFAYED logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/">
              الصفحة الرئيسية
            </Link>
            <Link className="nav-link" to="/category">
              المواد العلمية
            </Link>
            <Link className="nav-link" to="/all-courses">
              الكورسات
            </Link>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                مدرس
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {teacherLoginStatus != "true" && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/teacher-login">
                        تسجيل الدخول
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/teacher-register">
                        إنشاء حساب
                      </Link>
                    </li>
                  </>
                )}
                {teacherLoginStatus == "true" && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/teacher-dashboard">
                        لوحة التحكم
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/teacher-logout">
                        تسجيل الخروج
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                طالب
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {studentLoginStatus !== "true" && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/user-login">
                        تسجيل الدخول
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/user-register">
                        إنشاء حساب
                      </Link>
                    </li>
                  </>
                )}
                {studentLoginStatus === "true" && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/user-dashboard">
                        لوحة التحكم
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/user-logout">
                        تسجيل الخروج
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </div>
        </div>
        <form class="d-flex">
          <input
            name="search"
            onChange={handleChange}
            class="form-control ms-2"
            type="search"
            placeholder="اسم الكورس"
            aria-label="Search"
          />
          <button onClick={searchCourse} class="btn btn-warning" type="button">
            بحث
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Header;
