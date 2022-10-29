import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import Link from '@tiptap/extension-link'
import CharacterCount from '@tiptap/extension-character-count'

import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';



const Editor = () => {
  
  const editor = useEditor({
    content: '<p></p>',
    extensions: [
      StarterKit, TextStyle, Color, FontFamily, CharacterCount,
    ],
  })

  if (!editor) {
    return null
  }
  


  return (
    <div>
      <div className='editor-navbar-container'>
        <div className='undo-redo'>
          <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} style={{border: 0, backgroundColor: 'white'}}>
            <UndoIcon/>
          </button>
          <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} style={{border: 0, backgroundColor: 'white'}}>
            <RedoIcon/>
          </button>
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
      </div>
      
      <div className='editor-main-container'>
        <EditorContent editor={editor} />
      </div>

      <div className='editor-meta-container'>
        <div style={{marginTop: 'auto', width: '100%'}}>{editor.storage.characterCount.words()} words</div>
      </div>
    </div>

    
  )
}

export default Editor

