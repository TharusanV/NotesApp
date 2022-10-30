import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import Link from '@tiptap/extension-link'
import CharacterCount from '@tiptap/extension-character-count'
import Underline from '@tiptap/extension-underline'

import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

import jsPDF from 'jspdf';
import { useState } from 'react'

import { FontSize } from './Extentions/FontSize'


const Editor = () => {
  const [editorContent, setEditorContent] = useState("");

  const [fontSize, setFontSize] = useState(16);

  const editor = useEditor({
    content: '<p></p>',
    extensions: [
      StarterKit, TextStyle, Color, FontFamily, CharacterCount, FontSize,
    ],
    onUpdate({ editor }) {
      setEditorContent(editor.getHTML());
    }
  })

  if (!editor) {
    return null
  }

  const generatePDF = () => {
    let doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector("#content"), {
      callback: function(pdf){
        pdf.save("mypdf.pdf");
      } 
    });
  };
  

  return (
    <div style={{marginTop: '10px', marginLeft: '4px'}}>
      <div className="editor-header-container">
        <input id='note-title' type='text' autoFocus />
      </div>
      
      <div className='editor-navbar-container'>
        <div className='generate-pdf'>
          <button onClick={() => { generatePDF() }} type='primary'>Generate PDF</button>
        </div>

        <div className='undo-redo'>
          <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} style={{border: 0, backgroundColor: 'white'}}>
            <UndoIcon/>
          </button>
          <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} style={{border: 0, backgroundColor: 'white'}}>
            <RedoIcon/>
          </button>
        </div>

        <div className='font-size'>
          <input 
            type="number"
            onChange={(event) => {setFontSize(event.target.value);}}
            value= {fontSize}
            autofocus
          />
          <label>px</label>
        </div>

        <div className='font-bold'>
          <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={ !editor.can() .chain() .focus() .toggleBold() .run() }
          className={editor.isActive('bold') ? 'is-active' : ''}
          style={{border: 0, backgroundColor: 'white', fontSize: '20px'}}
          >
            <strong>B</strong>
          </button>
        </div>
        
        <div className='font-italic'>
          <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can() .chain() .focus() .toggleItalic() .run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          style={{border: 0, backgroundColor: 'white', fontSize: '20px'}}
          >
            <strong><i>I</i></strong>
          </button>
        </div>

        <div className='font-underline'>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}
          >
            <FormatUnderlinedIcon/>
          </button>
        </div>

        <div className='font-color'>
          <input 
            type="color" 
            style={{marginRight: '5px'}} 
            onInput={event => editor.chain().focus().setColor(event.target.value).run()} 
            value={editor.getAttributes('textStyle').color}
          />
          <label>
            Font Color
          </label>
        </div>

        <div className='bullet-list' style={{marginTop: '4px'}}>
          <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          style={{border: 0, backgroundColor: 'white'}}
          >
            <FormatListBulletedIcon/>
          </button>      
        </div>

        <div className='ordered-list' style={{marginTop: '4px'}}>
          <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
          style={{border: 0, backgroundColor: 'white'}}
          >
            <FormatListNumberedIcon/>
          </button>      
        </div>

        <div className='character-count'>
          <div style={{}}>{editor.storage.characterCount.words()} words</div>
        </div>
      </div>


      <div className='editor-note-container'>
        <EditorContent editor={editor} />
      </div>
    </div>
    

    
  )
}

export default Editor

