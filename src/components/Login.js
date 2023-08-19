import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import themeContext from "../context/theme/themeContext";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { isDarkTheme } = useContext(themeContext);
  let navigate = useNavigate();

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const host = process.env.REACT_APP_HOST_STRING;

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      // localStorage.setItem("name", json.name);
      // localStorage.setItem("email", json.email);
      props.showAlert("Logged in Scuccessfully ", "success");

      navigate("/");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };
  return (
    <div className="container">
      <h1>Login to Continue to iNotebook</h1>
      <form onSubmit={handlesubmit} className="my-4">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={onchange}
          />
          <div id="emailHelp" className="form-text">
            <p style={{ color: `${isDarkTheme ? "white" : "black"}` }}>
              We'll never share your email with anyone else.
            </p>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={onchange}
            type="password"
            value={credentials.password}
            name="password"
            className="form-control"
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
