'use client'

import { useEditor, EditorContent, BubbleMenu, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import '../TipTapEditor/styles.css' // Ensure your custom CSS file is imported

const Tiptap = ({tipTapContent , onChange} : {tipTapContent : string , onChange : Function}) => {
    const handleChange = (newContent : string) =>{
        onChange(newContent)
    }
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps : {
        attributes : {
            class :'border bg-white shadow-xl outline-none p-2 min-h-96 text-gray-500'
        }
    },
    content : tipTapContent,
    onUpdate : ({editor}) => {
        handleChange(editor.getHTML())
    }
    
  })
    console.log("🚀 ~ Tiptap ~ tipTapContent:", tipTapContent)

  const [isEditable, setIsEditable] = useState(true)
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    strike: false,
  })
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(tipTapContent)
    }
  }, [tipTapContent, editor])


  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable)

      // Update active formats when the editor's state changes
      const updateActiveFormats = () => {
        setActiveFormats({
          bold: editor.isActive('bold'),
          italic: editor.isActive('italic'),
          strike: editor.isActive('strike'),
        })
      }

      editor.on('update', updateActiveFormats)
      editor.on('selectionUpdate', updateActiveFormats)

      return () => {
        editor.off('update', updateActiveFormats)
        editor.off('selectionUpdate', updateActiveFormats)
      }
    }
  }, [isEditable, editor])

  return (
    <>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bg-white rounded-md shadow-md flex gap-2 p-2 ">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded-md transition-colors duration-200 ${
                activeFormats.bold
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              <strong>B</strong>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded-md transition-colors duration-200 ${
                activeFormats.italic
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              <em>I</em>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`p-2 rounded-md transition-colors duration-200 ${
                activeFormats.strike
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              <s>S</s>
            </button>
          </div>
        </BubbleMenu>
      )}
      <EditorContent style = {{whiteSpace : 'pre-line'}}editor={editor}  />
    </>
  )
}

export default Tiptap
