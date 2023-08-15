import React, { useContext } from "react";
import Notecontext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const { note, updatenote } = props;
  const context = useContext(Notecontext);
  const { deleteNote } = context;
  const handleclick = (e) => {
    e.preventDefault();

    deleteNote(note._id);
    props.showAlert("successfully deleted note", "success");
  };

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5
              className="card-title"
              style={{
                maxWidth: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {note.title}
            </h5>
            <i className="fa-solid fa-trash mx-2" onClick={handleclick}></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updatenote(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
