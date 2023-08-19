import React, { useState } from "react";
import AboutContext from "./AboutContext";

const AboutState = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    about: "",
  });
  const [aboutImage, setAboutImage] = useState(null);
  const [file, setFile] = useState(null);
  const [Allfile, setAllFile] = useState([]);

  const host = "http://localhost:5000";
  //get all notes
  const getfiles = async () => {
    const response = await fetch(`${host}/api/files/fetchallfiles`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json);
    setAllFile(json);
  };

  //delete a file

  const deletefile = async (id) => {
    await fetch(`${host}/api/files/deletefile/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    // const json = await response.json();
    // console.log(json + "from delete");
    // console.log(id);
    setAllFile(
      Allfile.filter((file) => {
        return file._id !== id;
      })
    );
  };
  return (
    <>
      <AboutContext.Provider
        value={{
          credentials,
          setCredentials,
          aboutImage,
          setAboutImage,
          file,
          setFile,
          Allfile,
          setAllFile,
          getfiles,
          deletefile,
        }}
      >
        {props.children}
      </AboutContext.Provider>
    </>
  );
};

export default AboutState;
