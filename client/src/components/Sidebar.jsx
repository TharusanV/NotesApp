
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h1 style={{margin: 0}}>Notes</h1>
        <button style={{marginRight: '7px', border: '2px solid black', backgroundColor: 'white'}}><AddIcon/></button>
      </div>

      <div className="sidebar-notes">
        <div className="sidebar-note">
          <div className="sidebar-note-header">
            <strong>TITLE</strong>
            <button style={{color: 'red', marginRight: '1px'}}><DeleteIcon/></button>
          </div>
          <p className="sidebar-note-preview">
            Preview
          </p>
          <small className="sidebar-note-meta">
            Last modified: [date]
          </small>
        </div>
      </div>
    </div>
  )
}

export default Sidebar