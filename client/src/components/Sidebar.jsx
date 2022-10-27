import { Stack, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Sidebar = () => {
  return (
    <div className="sidebar-container" style={{backgroundColor: 'red', height: '100vh', width: '15%', zIndex: '100', position:'absolute'}}>
      <div className="sidebar-header" style={{borderBottom: '2px solid black', display: 'flex', marginLeft: '10px', marginRight: '10px', marginTop: '10px', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 style={{margin: 0}}>Notes</h1>
        <AddIcon style={{border: '2px solid black', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: "white", alignItems: 'center', display: 'inline'}}/>
      </div>

      <div className="sidebar-notes">
        <div className="sidebar-note" style={{border: '2px solid black', marginTop:'10px', backgroundColor: "white", marginLeft: '10px', marginRight: '10px'}}>
          <div className="sidebar-note-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <strong>TITLE</strong>
            <DeleteIcon style={{marginRight: '5px', marginTop: '1px',border: '2px solid black', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: "white", alignItems: 'center', display: 'inline'}}/>
          </div>
          <div className="sidebar-note-preview">
            <p>Preview</p>
          </div>
          <div className="sidebar-note-meta">
            <p>Character Count: </p>
            <p>Last modified: </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar