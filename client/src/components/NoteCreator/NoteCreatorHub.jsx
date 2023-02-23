import React, { useEffect } from "react";
import "../../css/Note Creator/noteCreator.css";
import { useState } from "react";
import uuid from "react-uuid";
import NoteCreatorEditor from "./NoteCreatorEditor";
import NoteCreatorSidebar from "./NoteCreatorSidebar";

const NoteCreatorHub = () => {
  const [notes, setNotes] = useState([]); //Array of note objects (Getter = notes, Setter = setNotes())
  const [activeNote, setActiveNote] = useState(false); //Stores the current active note - false meaning no active note (Getter = activeNote, Setter = setActiveNotes())

  //Arrow function to add notes to the notes array aswell as the notes table in the database.
  const onAddNote = () => {
    const newNote = {
      noteIDCustom: uuid(),
      userID: 1,
      title: "Untitled Note",
      body: "",
      topic: "General",
      changed: Date.now(),
      likes: 0,
      dislikes: 0,
    };

    setNotes([newNote, ...notes]); //Adding the new note alongside the existing notes. The ... means that we will take everything in the existing notes array and put it into this new array
  };

  //Arrow function to delete notes from the notes array and the notes table in the database
  const onDeleteNote = (deletednoteIDCustom) => {
    setNotes(notes.filter((note) => note.noteIDCustom !== deletednoteIDCustom)); //Will print false if the current iteration's ID matches with the deleted note id and then remove it from the note array
  };

  //Arrow function to find the active note
  const getActiveNote = () => {
    return notes.find((note) => note.noteIDCustom === activeNote);
  };

  //Function to update the note in the notes array and use the updateNoteDB function to update the title,body and topic in the notes table for the database
  const onUpdateNote = (updateNote) => {
    const updateNotesArray = notes.map((note) => {
      if (note.noteIDCustom === activeNote) {
        return updateNote;
      }

      return note;
    });

    setNotes(updateNotesArray);
  };

  //Use effect that runs once when the page is loaded which sets the title of the page and loads the notes currently hardcodded to userID = 1 
  useEffect(() => {
    document.title = "Note Creator | EduNotes"
  }, []);

  return (
    <div className="NoteCreatorHub">
      {/*Passing in props from this component to the others that require certain states or functions - May use a state manager*/}
      <div style={{ display: "flex" }}>
        <NoteCreatorSidebar
          prop_Notes={notes}
          prop_OnAddNote={onAddNote}
          prop_OnDeleteNote={onDeleteNote}
          prop_ActiveNote={activeNote}
          prop_SetActiveNote={setActiveNote}
        />
        <NoteCreatorEditor
          prop_GetActiveNote={getActiveNote()}
          prop_OnUpdateNote={onUpdateNote}
        />
      </div>
    </div>
  );
};

export default NoteCreatorHub;
