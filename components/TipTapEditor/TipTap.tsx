'use client'

import { useEditor, EditorContent, BubbleMenu, Editor ,FloatingMenu } from '@tiptap/react'
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
            class :'border bg-white outline-none p-2 min-h-96 text-gray-500'
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
    bulletList : false,
    blockquote : false,
    orderedList : false,
    codeblock : false
  })

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable)

      // Update active formats when the editor's state changes
      const updateActiveFormats = () => {
        setActiveFormats({
          bold: editor.isActive('bold'),
          italic: editor.isActive('italic'),
          strike: editor.isActive('strike'),
          bulletList : editor.isActive('bulletList'),
          blockquote : editor.isActive('blockquote'),
          orderedList : editor.isActive('orderedList'),
          codeblock : editor.isActive('codeblock')
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
        <div className='bubble-menu'>
          <button
            onClick={(e) => {
                e.preventDefault()    
                editor.chain().focus().toggleBold().run()
            }}
          >
            <strong>B</strong>
          </button>
          <button
            onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleItalic().run()}}
          >
            <em>I</em>
          </button>
          <button
            onClick={(e) =>{
                e.preventDefault()
                editor.chain().focus().toggleStrike().run()}}
          >
            <s>S</s>
          </button>
          <button
            onClick={(e) =>{
                e.preventDefault()
                editor.chain().focus().toggleHeading({ level: 1 }).run()}}
          >
            H1
          </button>
          <button
            onClick={(e) =>{
                e.preventDefault()
                editor.chain().focus().toggleHeading({ level: 2 }).run()}}
          >
            H2
          </button>
          <button
            onClick={(e) =>{
                e.preventDefault()
                editor.chain().focus().toggleBulletList().run()}}
          >
            BP
          </button>
          <button
            onClick={(e) =>{
                e.preventDefault()
                editor.chain().focus().toggleBlockquote().run()}}
          >
            Qu
          </button>
          <button
            onClick={(e) =>{
                e.preventDefault()
                editor.chain().focus().toggleOrderedList().run()}}
          >
             list
          </button>
          <button
            onClick={(e) =>{
                e.preventDefault()
                editor.chain().focus().toggleCodeBlock().run()}}
          >
           code
          </button>
        </div>
      </BubbleMenu>
    )}
    {/* {editor && (
      <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="bg-white rounded-md shadow-md flex gap-2 p-2">
          <button
            onClick={(e) =>{
                e.preventDefault()
                editor.chain().focus().toggleHeading({ level: 1 }).run()}}
            className={`p-2 rounded-md transition-colors duration-200 ${
              editor.isActive('heading', { level: 1 }) ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            H1
          </button>
          <button
            onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleHeading({ level: 2 }).run()}}
            className={`p-2 rounded-md transition-colors duration-200 ${
              editor.isActive('heading', { level: 2 }) ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            H2
          </button>
          <button
            onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleBulletList().run()}}
            className={`p-2 rounded-md transition-colors duration-200 text-xs ${
              editor.isActive('bulletList') ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Bullet
          </button>
          <button
            onClick={(e) =>{
                e.preventDefault()
                editor.chain().focus().toggleBlockquote().run()}}
            className={`p-2 rounded-md transition-colors duration-200 text-xs${
              editor.isActive('blockquote') ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            quote
          </button>
          <button
            onClick={(e) =>{
                e.preventDefault()
                editor.chain().focus().toggleOrderedList().run()}}
            className={`p-2 rounded-md transition-colors duration-200 text-xs ${
              editor.isActive('orderedList') ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
             list
          </button>
        </div>
      </FloatingMenu>
    )} */}
    <EditorContent style={{ whiteSpace: 'pre-line' }} editor={editor} />
  </>
  )
}

export default Tiptap
