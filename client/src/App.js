import './App.css';
import { NoteEditor, Sidebar } from './components';
import { useState } from 'react';
import uuid from 'react-uuid'

const App = () => {

  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now() ,
    };

    setNotes([newNote, ...notes]); //The ... means that we will take everything in the existing notes array and put it into this new array
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote)
  }

  const onDeleteNote = (deletedNoteID) => {
    setNotes(notes.filter((note) => note.id !== deletedNoteID)); //Will print false if it matches with the to be deleted note id and then remove it
  }

  const onUpdateNote = (updateNote) => {
    const updateNotesArray = notes.map((note) => {
      if(note.id === activeNote){
        return updateNote;
      }

      return note;
    });

    setNotes(updateNotesArray);
  }
  

  return (
    <div className='App'>
      <Sidebar prop_Notes={notes} prop_OnAddNote={onAddNote} prop_OnDeleteNote={onDeleteNote} prop_ActiveNote={activeNote} prop_SetActiveNote={setActiveNote}/>
      <NoteEditor prop_GetActiveNote={getActiveNote()} prop_OnUpdateNote={onUpdateNote}/>
    </div>
  )
}

export default App;
