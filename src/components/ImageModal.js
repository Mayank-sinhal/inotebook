import React, { useContext } from "react";
import AboutContext from "../context/about/AboutContext";
import themeContext from "../context/theme/themeContext";

const ImageModal = ({ title, img }) => {
  const { refm } = useContext(AboutContext);
  const { isDarkTheme } = useContext(themeContext);

  const handleDownload = async () => {
    const response = await fetch(img); // Fetch the image from the provided URL
    const blob = await response.blob(); // Convert the response to a blob

    // Create a URL for the blob
    const blobUrl = URL.createObjectURL(blob);

    // Create a link element and trigger a click to download the blob
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${title}.png`; // Set the download filename
    link.click();

    // Clean up by revoking the blob URL
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#ImageModal"
        ref={refm}
      ></button>

      <div
        className="modal fade"
        id="ImageModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        data-bs-theme={`${isDarkTheme ? "dark" : "light"}`}
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-fullscreen "
          style={{ width: "80%", margin: "auto", padding: "1rem" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <img src={img} alt={title} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDownload}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
