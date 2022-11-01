import { useState } from 'react'

import {Editor} from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

const NoteEditor = ( {prop_GetActiveNote, prop_OnUpdateNote}) => {
 
  const onEditField = (key, value) => {
    
    prop_OnUpdateNote({
      ...prop_GetActiveNote,
      id: prop_GetActiveNote.id,
      [key]: value,
      lastModified: Date.now(),
    })
  };
  
  if(!prop_GetActiveNote) return <div className='no-active-note'>No selected note</div>  

  return (
    <div className='hero-container'>
      <div className='main-note-editor-container'>     
        <input 
          id='note-title' 
          type='text' 
          onChange={(event) => onEditField("title", event.target.value)} 
          autoFocus 
          value={prop_GetActiveNote.title} 
        />

        <div>
          <CKEditor
            editor={Editor}
            data="<p></p>"
            onChange={(event, editor) => {
                const data = editor.getData();
                onEditField("body", data)
            }}
          />
        </div>        
      </div>
    </div>


      
    
    

    
  )
}

export default NoteEditor

