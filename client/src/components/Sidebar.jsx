
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Sidebar = ({prop_Notes, prop_OnAddNote, prop_OnDeleteNote, prop_ActiveNote, prop_SetActiveNote}) => {
  
  const sortedNotes = prop_Notes.sort((a,b) => b.lastModified - a.lastModified);
  
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h1 style={{margin: 0}}>Notes</h1>
        <button 
        onClick={prop_OnAddNote} 
        style={{marginRight: '7px', border: '2px solid black', backgroundColor: 'white'}}
        >
          <AddIcon/>
        </button>
      </div>

      <div className="sidebar-notes">
        {sortedNotes.map((note)=>(
          <div key={note.id} 
            className={`sidebar-note ${note.id === prop_ActiveNote && "active"}`} 
            onClick={() => prop_SetActiveNote(note.id)}
          >
            <div className="sidebar-note-header">
              <strong>{note.title} </strong>
              <button 
                style={{color: 'red', marginRight: '1px'}}
                onClick={() => prop_OnDeleteNote(note.id)}
              >
                <DeleteIcon/>
              </button>
            </div>
              <p className="sidebar-note-preview">
                {(note.body && note.body.substr(0,100) + '...').replace(/<[^>]+>/g, '')} {/*Only if there is a note body then take a certain number of characters as its a preview*/}
              </p>
              <small className="sidebar-note-meta">
                Last modified: {new Date(note.lastModified).toLocaleDateString("en-GB", {hour: "2-digit", minute: "2-digit",})}
              </small>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar