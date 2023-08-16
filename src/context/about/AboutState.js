import React, { useState } from "react";
import AboutContext from "./AboutContext";

const AboutState = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "" });
  return (
    <>
      <AboutContext.Provider value={{ credentials, setCredentials }}>
        {props.children}
      </AboutContext.Provider>
    </>
  );
};

export default AboutState;
