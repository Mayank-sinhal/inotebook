import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

import AboutContext from "../context/about/AboutContext";
import themeContext from "../context/theme/themeContext";

const About = (props) => {
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const refc = useRef(null);
  const fileInputRef = useRef(null);
  const context = useContext(AboutContext);
  const { isDarkTheme } = useContext(themeContext);
  const { name, email, about } = context.credentials;
  const handleclick = () => {
    ref.current.click();
  };

  const handleview = () => {};

  const handleimageupload = (e) => {
    context.setFile(e.target.files[0]);
  };

  const handledelete = (id) => {
    context.deletefile(id);
    props.showAlert("successfully deleted note", "success");
  };

  const handleUpload = async () => {
    if (!context.file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", context.file);
    refc.current.click();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/files/addfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        context.setAllFile(context.Allfile.concat(response.data));
        props.showAlert("File uploaded Scuccessfully ", "success");
      }
    } catch (error) {
      props.showAlert("Error uploading file ", "danger");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input value to clear selection
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/getuser", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "auth-token": token,
        },
      });
      const json = await response.json();
      if (json.success) {
        setLoading(false);
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
    context.getfiles();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center">
            {loading ? (
              <LoadingSpinner />
            ) : (
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
            )}
          </div>
          <div className="col-md-6 d-flex justify-content-cente my-3">
            {loading ? (
              <LoadingSpinner />
            ) : (
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
            )}
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
            Upload New Image
          </button>
        </div>
        <div className="container my-2" style={{ paddingBottom: "12px" }}>
          <ul
            className="list-group"
            data-bs-theme={`${isDarkTheme ? "dark" : "light"}`}
          >
            {context.Allfile.map((item, index) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between"
                  key={item._id}
                >
                  <div>
                    {index + 1} {item.originalname}
                  </div>
                  <div>
                    <i
                      className="fa-regular fa-eye mx-2"
                      onClick={handleview}
                    ></i>
                    <i
                      className="fa-solid fa-trash mx-2"
                      onClick={() => {
                        handledelete(item._id);
                      }}
                    ></i>
                  </div>
                </li>
              );
            })}
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
                Upload File
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
                  onChange={handleimageupload}
                  ref={fileInputRef}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refc}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary "
                onClick={handleUpload}
              >
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
