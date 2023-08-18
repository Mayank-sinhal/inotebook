import React, { useContext, useEffect, useRef } from "react";

import AboutContext from "../context/about/AboutContext";
import themeContext from "../context/theme/themeContext";

const About = () => {
  const ref = useRef(null);
  const context = useContext(AboutContext);
  const { isDarkTheme } = useContext(themeContext);
  const { name, email, about } = context.credentials;
  const handleclick = () => {
    ref.current.click();
  };

  useEffect(() => {
    const fetchdata = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/getuser", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "auth-token": token,
        },
      });
      const json = await response.json();
      if (json.success) {
        // localStorage.setItem("about", json.user.about);
        // localStorage.setItem("name", json.user.name);
        // localStorage.setItem("email", json.user.email);
        // const name = localStorage.getItem("name");
        // const email = localStorage.getItem("email");
        // const about = localStorage.getItem("about");
        context.setCredentials({
          name: json.user.name,
          email: json.user.email,
          about: json.user.about,
        });
        context.setAboutImage(json.user.image);
      }
    };
    fetchdata();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center">
            <div
              className="d-flex justify-content-center  "
              style={{ height: "15rem", maxWidth: "15rem" }}
            >
              <img
                src={context.aboutImage}
                alt="Profile"
                className={`profile-image img-fluid rounded-circle border border-${
                  isDarkTheme ? "light" : "dark"
                } p-2`}
              />
            </div>
          </div>
          <div className="col-md-6 d-flex  my-3">
            <div className=" d-flex flex-column align-items-center justify-content-center about-details">
              <h2>About Me</h2>
              <p>{about}</p>
              <p className="mb-0">
                <strong>Name:</strong> {name}
              </p>
              <p className="mb-0">
                <strong>Email:</strong> {email}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container "
        style={{
          marginTop: 4.5 + "rem",
          backgroundColor: "#FAF0E6",
          padding: "0",
        }}
      >
        <div
          className={`navbar bg-${isDarkTheme ? "dark" : "light"} `}
          style={{ width: "100%" }}
        >
          <h2
            className="mb-0 "
            style={{
              color: `${isDarkTheme ? "white" : "black"}`,
              marginLeft: "2rem",
            }}
          >
            Your Uploads
          </h2>
          <button
            className={`btn btn-${isDarkTheme ? "light" : "dark"} mx-3`}
            onClick={handleclick}
          >
            Upload New File
          </button>
        </div>
        <div className="container my-2" style={{ paddingBottom: "12px" }}>
          <ul
            className="list-group"
            data-bs-theme={`${isDarkTheme ? "dark" : "light"}`}
          >
            <li className="list-group-item">An item</li>
            <li className="list-group-item">A second item</li>
            <li className="list-group-item">A third item</li>
            <li className="list-group-item">A fourth item</li>
            <li className="list-group-item">And a fifth one</li>
          </ul>
        </div>
      </div>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-theme={`${isDarkTheme ? "dark" : "light"}`}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  id="inputGroupFile04"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
