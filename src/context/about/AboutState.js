import React, { useState } from "react";
import AboutContext from "./AboutContext";

const AboutState = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    about: "",
  });

  const [aboutImage, setAboutImage] = useState(null);
  return (
    <>
      <AboutContext.Provider
        value={{ credentials, setCredentials, aboutImage, setAboutImage }}
      >
        {props.children}
      </AboutContext.Provider>
    </>
  );
};

export default AboutState;
