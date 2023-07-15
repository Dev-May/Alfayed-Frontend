import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function Dashboard() {
  const [dashbardData, setdashbardData] = useState([]);
  const studentId = localStorage.getItem("studentId");
  useEffect(() => {
    // Fetch Courses
    try {
      axios.get(baseUrl + "/student/dashboard/" + studentId).then((res) => {
        console.log(res);
        setdashbardData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  document.title = "My Dashboard";

  return (
    <div className="container mt-4 text-center">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="row">
            <div className="col-md-4">
              <div className="card border-primary">
                <h5 className="card-header bg-primary text-white">
                  المقررات التى تم الاشتراك بها
                </h5>
                <div className="card-body">
                  <h3>
                    <Link className="link-style" to="/my-courses">
                      {dashbardData.enrolled_courses}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-success">
                <h5 className="card-header bg-success text-white">
                  المقررات المفضلة
                </h5>
                <div className="card-body">
                  <h3>
                    <Link className="link-style" to="/favorite-courses">
                      {dashbardData.favorite_courses}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-info">
                <h5 className="card-header bg-info text-white">الإشعارات</h5>
                <div className="card-body">
                  <h6>
                    <Link className="link-style" to="/my-assignments">
                      المكتملة: {dashbardData.complete_assignments}
                      <br></br>
                      قيد التنفيذ: {dashbardData.pending_assignments}
                    </Link>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
