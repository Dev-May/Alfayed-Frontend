import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function Footer() {
  const [pagesData, setpagesData] = useState([]);
  // Fetch courses when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + "/pages/").then((res) => {
        setpagesData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <footer className="py-3 my-5">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item">
          <Link to="/" className="nav-link px-2 text-muted">
            الصفحة الرئيسية
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/faq" className="nav-link px-2 text-muted">
            الأسئلة الشائعة
          </Link>
        </li>
        {pagesData &&
          pagesData.map((row, index) => (
            <li className="nav-item">
              <Link
                to={`/page/${row.id}${row.url}`}
                className="nav-link px-2 text-muted"
              >
                {row.title}
              </Link>
            </li>
          ))}
        <li className="nav-item">
          <Link to="/contact-us" className="nav-link px-2 text-muted">
            إتصل بنا
          </Link>
        </li>
      </ul>
      <p className="text-center text-muted">© Dev May</p>
    </footer>
  );
}

export default Footer;
