import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'

import CharacterCount from '@tiptap/extension-character-count'
import Underline from '@tiptap/extension-underline'


import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import jsPDF from 'jspdf';
import { useState } from 'react'

import { FontSize } from './Extentions/FontSize'


const Editor = ( {prop_GetActiveNote, prop_OnUpdateNote}) => {
  const [editorContent, setEditorContent] = useState("");
  const [fontSize, setFontSize] = useState(16);

  const fontOptions = [
    {value: "Arial", label: "Arial"},
    {value: "Inter", label: "Inter"},
    {value: "Calibri", label: "Calibri"},  
    {value: "Cambria", label: "Cambria"},    
  ];

  const onEditField = (key, value) => {
    prop_OnUpdateNote({
      ...prop_GetActiveNote,
      id: prop_GetActiveNote.id,
      [key]: value,
      lastModified: Date.now(),
    })
  };

  const editor = useEditor({
    content: `<p></p>`,
    extensions: [
      StarterKit, TextStyle, Color, CharacterCount, FontSize, 
      Underline, FontFamily,
    ],
    onUpdate({ editor}) {
      setEditorContent(editor.getHTML());
      onEditField("body", editor.getText());
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

  function fontFamilySelector(){
    let fontSelector = document.getElementById("font-family-selector");
    let fontSelectorValue = fontSelector.options[fontSelector.selectedIndex].text;
    editor.commands.setFontFamily(fontSelectorValue);
  }

  if(!prop_GetActiveNote) return <div className='no-active-note'>No selected note</div>
  

  return (
    <div className='hero-container'>
      <div className='main-note-editor-container'>
        <input id='note-title' type='text' onChange={(event) => onEditField("title", event.target.value)} autoFocus value={prop_GetActiveNote.title} />
        <div className='navbar'>
          
          <div className='undo-redo'>
            <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} style={{border: 0, backgroundColor: 'white'}}>
              <UndoIcon/>
            </button>
            <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} style={{border: 0, backgroundColor: 'white'}}>
              <RedoIcon/>
            </button>
          </div>

          <select className="font-family" id="font-family-selector" value={''} onChange={fontFamilySelector}>
            {fontOptions.map((font) => (
              <option key={font.label} value={font.value || ''}>{font.label}</option>
            ))}
          </select>

          <div className='font-size'>
            <input 
              type="number"
              onChange={(event) => {setFontSize(event.target.value);}}
              value= {fontSize}
              autoFocus
            />
            <span>px</span>
          </div>

          <div className="font-header">
            <button
            style={{marginRight: "10px"}}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
              H1
            </button>
            <button
            style={{marginRight: "10px"}}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
              H2
            </button>
            <button
            style={{marginRight: "10px"}}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            >
              H3
            </button>
          </div>
          
          <div className='font-bold'>
            <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={ !editor.can() .chain() .focus() .toggleBold() .run() }
            className={editor.isActive('bold') ? 'is-active' : ''}
            style={{border: 0, backgroundColor: 'white', fontSize: '20px'}}
            >
              <FormatBoldIcon/>
            </button>
          </div>

          <div className='font-italic'>
            <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can() .chain() .focus() .toggleItalic() .run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
            style={{border: 0, backgroundColor: 'white', fontSize: '20px'}}
            >
              <FormatItalicIcon/>
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
            <label style={{fontSize: '16px'}}>Font Color</label>
          </div>

          <div className='bullet-list'>
            <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
            style={{border: 0, backgroundColor: 'white'}}
            >
              <FormatListBulletedIcon/>
            </button>      
          </div>

          <div className='ordered-list'>
            <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
            style={{border: 0, backgroundColor: 'white'}}
            >
              <FormatListNumberedIcon/>
            </button>      
          </div>

          <div className='block-quote'>
            <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
              <FormatQuoteIcon />
            </button>
          </div>

          <div className='horizontal-ruler'>
            <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
              <HorizontalRuleIcon/>
            </button>
          </div>

          <div className='character-count'>
            <p style={{display: 'inline', fontSize: '16px'}}>{editor.storage.characterCount.words()} words</p>
          </div>

          <div className='generate-pdf'>
            <button onClick={() => { generatePDF() }} type='primary'>Generate PDF</button>
          </div>
        </div>
        
        <EditorContent editor={editor}/>        
      
      </div>
    </div>


      
    
    

    
  )
}

export default Editor

