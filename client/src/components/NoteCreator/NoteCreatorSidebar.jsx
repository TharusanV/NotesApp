import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";

//With props being an object we know props has one key on it therefore we can destructure it through naming the key creating a local variable
const NoteCreatorSidebar = ({
  prop_Notes,
  prop_OnAddNote,
  prop_OnDeleteNote,
  prop_ActiveNote,
  prop_SetActiveNote,
}) => {
  let navigate = useNavigate();

  const route = () => {
    navigate("/");
  };
  const sortedNotes = prop_Notes.sort((a, b) => b.changed - a.changed); //An array which will get the Notes prop from the hub and sort it based on last modified

  //Function to return the pure text for each note which will be used in the sidebar note preview
  function getText(html) {
    var divContainer = document.createElement("div");
    divContainer.innerHTML = html;
    return divContainer.textContent || divContainer.innerText || "";
  }
        

  return (
    <div className="noteCreator-sidebar-container">

      <div className="noteCreator-sidebar-header">
        <h1 style={{margin: 0}}>Notes</h1>

        {/*Add Button*/}
        <button 
          onClick={prop_OnAddNote} 
          style={{marginRight: '7px', border: '2px solid black', backgroundColor: 'white'}}
        >
          <AddIcon/>
        </button>
      </div>

      <div className="noteCreator-sidebar-notes">
        {/*This map function will create a div for each note in the array containing the note's title, preview body, metadata by looping through it*/}
        {sortedNotes.map((note) => (
          <div
            key={note.noteIDCustom}
            className={`noteCreator-sidebar-note ${
              note.noteIDCustom === prop_ActiveNote && "active"
            }`}
            onClick={() => prop_SetActiveNote(note.noteIDCustom)}
          >
            <div className="noteCreator-sidebar-note-header">
              {/*Note Title Text*/}
              <strong>{note.title} </strong>

              {/*Delete Note Button*/}
              <button
                style={{ color: "red", marginRight: "1px" }}
                onClick={() => prop_OnDeleteNote(note.noteIDCustom)}
              >
                <DeleteIcon/>
              </button>
            </div>

            {/*Note Body Preview - If there is a note body then do X (&&)*/}
            <p className="noteCreator-sidebar-note-preview">
              {getText(note.body && note.body.substr(0, 100) + "...")}
            </p>

            {/*Note Metadata*/}
            <small className="noteCreator-sidebar-note-meta">
              Last modified:{" "}
              {new Date(note.changed).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NoteCreatorSidebar