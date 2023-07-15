import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api/contact/";
function ContactUs() {
  const [ContactData, setContactData] = useState({
    full_name: "",
    email: "",
    query_txt: "",
    status: "",
  });
  // Change Element value
  const handleChange = (event) => {
    setContactData({
      ...ContactData,
      [event.target.name]: event.target.value,
    });
  };
  // End

  // Submit Form
  const submitForm = () => {
    const contactFormData = new FormData();
    contactFormData.append("full_name", ContactData.full_name);
    contactFormData.append("email", ContactData.email);
    contactFormData.append("query_txt", ContactData.query_txt);

    try {
      axios.post(baseUrl, contactFormData).then((response) => {
        setContactData({
          full_name: "",
          email: "",
          query_txt: "",
          status: "success",
        });
      });
    } catch (error) {
      console.log(error);
      setContactData({ status: "error" });
    }
  };
  // End

  const listStyle = {
    "list-style": "none",
  };

  useEffect(() => {
    document.title = "Contact Us";
  });

  return (
    <div className="container mt-4">
      <div className="row">
        {/* <div className="col-7">
          {ContactData.status == "success" && (
            <p className="text-success">شكرا لتواصلك معنا</p>
          )}
          {ContactData.status == "error" && (
            <p className="text-danger">حدث خطأ!!</p>
          )}
          <div className="card">
            <h5 className="card-header text-center">إتصل بنا</h5>
            <div className="card-body">
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  الاسم بالكامل
                </label>
                <input
                  value={ContactData.full_name}
                  onChange={handleChange}
                  name="full_name"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  رقم الهاتف
                </label>
                <input
                  value={ContactData.email}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Query
                </label>
                <textarea
                  rows="10"
                  value={ContactData.query_txt}
                  onChange={handleChange}
                  name="query_txt"
                  className="form-control"
                ></textarea>
              </div>
              <button
                onClick={submitForm}
                type="submit"
                className="btn btn-primary"
              >
                Send
              </button>
            </div>
          </div>
        </div> */}
        <div className="col-4 offset-1">
          <h3 className="border-bottom">إتصل بنا</h3>
          <ul className="m-0 p-0" style={listStyle}>
            <li className="mb-2">
              <label className="fw-bold">الدعم الفنى:</label>
              <span className="ms-2"> 01234567890</span>
            </li>
            <li className="mb-2">
              <label className="fw-bold">إستفسارات الطلاب:</label>
              <span className="ms-2"> 01234567890</span>
            </li>
            <li className="mb-2">
              <label className="fw-bold">إستفسارات المعلمين:</label>
              <span className="ms-2"> 1234567890</span>
            </li>
            <li className="mb-2">
              <label className="fw-bold">المساعدين:</label>
              <span className="ms-2"> 01234567890</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
