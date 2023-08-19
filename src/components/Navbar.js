import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import themeContext from "../context/theme/themeContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleTheme, isDarkTheme } = useContext(themeContext);

  const handleclick = () => {
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    document.body.classList.remove(isDarkTheme ? "light" : "dark");
    document.body.classList.add(isDarkTheme ? "dark" : "light");
  }, [location, isDarkTheme]);
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg bg-body-tertiary  navbar bg-${
          isDarkTheme ? "dark" : "light"
        } border-bottom border-body`}
        data-bs-theme={`${isDarkTheme ? "dark" : "light"}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/about" ? "active" : ""
                    }`}
                    to="/about"
                  >
                    About
                  </Link>
                </li>
              ) : null}
            </ul>
            <div className="d-flex justify-content-between">
              <div className="px-1 ">
                <svg
                  onClick={toggleTheme}
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  className="mt-1 ml-2"
                  style={{ color: `${isDarkTheme ? "white" : "black"}` }}
                  height="28"
                  width="28"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path>
                  <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"></path>
                </svg>
              </div>
              {!localStorage.getItem("token") ? (
                <form className="d-flex" role="search">
                  <Link
                    className="btn btn-primary mx-2"
                    to="/login"
                    role="button"
                  >
                    Login
                  </Link>
                  <Link className="btn btn-primary" to="/signup" role="button">
                    Signup
                  </Link>
                </form>
              ) : (
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "1rem" }}
                  onClick={handleclick}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
