import { useState } from "react";
import Notecontext from "./noteContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_HOST_STRING;
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  //get all notes
  const getnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };
  //add a note
  const addNote = async (title, description, tag) => {
    //todo api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };
  //delete a notee

  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    // const json = await response.json();
    // console.log(json + "from delete");
    // console.log(id);
    setNotes(
      notes.filter((note) => {
        return note._id !== id;
      })
    );
  };

  //edit a notee
  const editNote = async (id, title, description, tag) => {
    //api call

    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    // const json = await response.json();
    // console.log(json);

    let newnotes = JSON.parse(JSON.stringify(notes));
    ///lgic to edit in client
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
    }
    setNotes(newnotes);
  };
  return (
    <>
      <Notecontext.Provider
        value={{ notes, setNotes, addNote, deleteNote, editNote, getnotes }}
      >
        {props.children}
      </Notecontext.Provider>
    </>
  );
};

export default NoteState;
