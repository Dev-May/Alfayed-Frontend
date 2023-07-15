import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function CategoryCourses() {
  const [categoryData, setcategoryData] = useState([]);
  // Fetch courses when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + "/category/").then((res) => {
        setcategoryData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="container mt-3">
      {/* Latest Courses */}
      <h3 className="pb-1 mb-4">المواد العلمية</h3>
      <div className="col">
        <div className="row">
          {categoryData &&
            categoryData.map((row, index) => (
              <div className="col-md-4">
                <div className="card border-primary mb-3">
                  <div className="card-header bg-warning text-center">
                    <Link
                      className="link-style text-white"
                      to={`/course/${row.id}/${row.title}`}
                    >
                      {row.title} ({row.total_courses})
                    </Link>
                  </div>
                  <div className="card-body">
                    {/* <h5 className="card-title text-center">
                      <Link
                        className="link-style"
                        to={`/course/${row.id}/${row.title}`}
                      >
                        {row.title} ({row.total_courses})
                      </Link>
                    </h5> */}
                    <p className="card-text text-center">{row.description}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* End Latest Courses */}
      {/* Pagination Start */}
      {/* <nav aria-label="Page navigation example mt-5">
        <ul className="pagination justify-content-center">
            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
      </nav> */}
      {/* End */}
    </div>
  );
}

export default CategoryCourses;
