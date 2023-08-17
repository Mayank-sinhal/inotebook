import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import themeContext from "../context/theme/themeContext";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    about: "",
  });

  //use history hook

  let navigate = useNavigate();
  const { isDarkTheme } = useContext(themeContext);

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        about: credentials.about,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Scuccessfully Created your account", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
    console.log(json);
  };
  return (
    <div className="container">
      <h1>Signup to use iNotebook</h1>
      <form onSubmit={handlesubmit} className="my-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            aria-describedby="emailHelp"
            onChange={onchange}
          />
        </div>
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
          <label htmlFor="about" className="form-label">
            About
          </label>
          <input
            onChange={onchange}
            type="text"
            value={credentials.about}
            name="about"
            className="form-control"
            id="about"
            required
            minLength={5}
          />
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
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            onChange={onchange}
            type="password"
            value={credentials.cpassword}
            name="cpassword"
            className="form-control"
            required
            minLength={5}
            id="cpassword"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
