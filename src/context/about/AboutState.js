import React, { useRef, useState } from "react";
import AboutContext from "./AboutContext";

const AboutState = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    about: "",
  });

  const refm = useRef(null);
  const [aboutImage, setAboutImage] = useState(null);
  const [file, setFile] = useState(null);
  const [Allfile, setAllFile] = useState([]);

  //get all notes
  const getfiles = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_HOST_STRING}/api/files/fetchallfiles`,
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    // console.log(response);
    // console.log(json);
    setAllFile(json);
  };

  //delete a file

  const deletefile = async (id) => {
    await fetch(
      `${process.env.REACT_APP_HOST_STRING}/api/files/deletefile/${id}`,
      {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
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
          refm,
        }}
      >
        {props.children}
      </AboutContext.Provider>
    </>
  );
};

export default AboutState;
