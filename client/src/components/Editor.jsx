import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import History from '@tiptap/extension-history'
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

const Editor = () => {
  
  const editor = useEditor({
    content: '<p></p>',
    extensions: [
      StarterKit, TextStyle, Color,History,
    ],
  })

  if (!editor) {
    return null
  }


  return (
    <div>
      <div style={{display: 'inline-flex', alignItems: 'center', paddingBottom: '5px', borderBottom: '2px solid black'}}>
        <div className='undo-text' style={{marginRight: '10px'}}>
          <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
            <UndoIcon/>
          </button>
        </div>

        <div className='redo-text' style={{marginRight: '10px'}}>
          <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
            <RedoIcon/>
          </button>
        </div>

      


        <div className='font-bold' style={{marginRight: '10px'}}>
          <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={ !editor.can() .chain() .focus() .toggleBold() .run() }
          className={editor.isActive('bold') ? 'is-active' : ''}
          style={{border: 0, backgroundColor: 'white', fontSize: '20px'}}
          >
            <strong>B</strong>
          </button>
        </div>
        
        <div className='font-italic' style={{marginRight: '10px'}}>
          <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can() .chain() .focus() .toggleItalic() .run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          style={{border: 0, backgroundColor: 'white', fontSize: '20px', fontFamily: 'arial'}}
          >
            <strong><i>I</i></strong>
          </button>
        </div>

        <div className='font-color' style={{marginRight: '10px'}}>
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

      </div>
      
      <div style={{}}>
        <EditorContent editor={editor} />
      </div>
    </div>

    
  )
}

export default Editor