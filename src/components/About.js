import React, { useContext, useEffect, useRef } from "react";
import AboutContext from "../context/about/AboutContext";
import themeContext from "../context/theme/themeContext";

const About = () => {
  const ref = useRef(null);
  const context = useContext(AboutContext);
  const { isDarkTheme } = useContext(themeContext);
  const { name, email } = context.credentials;
  const handleclick = () => {
    ref.current.click();
  };

  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    context.setCredentials({ name, email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex justify-content-center max ">
              <img
                src="https://picsum.photos/id/237/250/250"
                alt="Profile"
                className={`profile-image img-fluid rounded-circle border border-${
                  isDarkTheme ? "light" : "dark"
                } p-2`}
              />
            </div>
          </div>
          <div className="col-md-6 d-flex  justify-content-center my-3">
            <div className=" d-flex flex-column align-items-center justify-content-center about-details">
              <h2>About Me</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tristique est vitae nisl posuere, sit amet tempor nulla
                hendrerit. Lorem, ipsum dolor sit amet consectetur adipisicing
                elit. Voluptatibus, dolore. Eveniet itaque ratione libero autem
                vel voluptatem fuga ipsam dolorum, amet ut aspernatur placeat,
                totam ad rerum facilis nam. Voluptatum.
              </p>
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
      <div className="container mt-6rem" style={{ marginTop: 4.5 + "rem" }}>
        <div
          className={`navbar bg-${
            isDarkTheme ? "dark" : "light"
          } d-flex justify-content-between align-items-center `}
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
