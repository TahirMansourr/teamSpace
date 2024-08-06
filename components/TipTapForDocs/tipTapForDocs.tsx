'use client'

import { InputPlaceholder } from '@mantine/core'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { useCallback } from 'react'
import { notifications } from '@mantine/notifications'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import './styles.css'

const TiptapForDocs = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https',
        linkOnPaste: true,
        validate: (href) => /^https?:\/\//.test(href),
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
    ],
    content: '<p>Hello World! 🌎️</p>',
    editorProps: {
      attributes: {
        class: 'w-full outline-none h-full',
        InputPlaceholder: 'Write something',
      },
    },
  })

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
      notifications.show({ color: 'red', message: 'You cannot have an empty URL' })
      return
    }
    if (!/^https?:\/\//.test(url)) {
      notifications.show({ color: 'red', message: 'Invalid URL. Please enter a valid URL starting with http:// or https://' })
      return
    }

    // update link
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="w-full">
      <div className='toolbar mx-auto'>
        <input
          type="color"
          onInput={(event : any) => (editor.chain().focus().setColor(event.target.value).run())}
          value={editor.getAttributes('textStyle').color}
          data-testid="setColor"
        />
        <button className={editor.isActive('bold') ? 'is-active' : ''} onClick={(e) => {
          e.preventDefault()
          editor?.chain().focus().toggleBold().run()
        }}>
          Bold
        </button>
        <button className={editor.isActive('blockquote') ? 'is-active' : ''} onClick={(e) => {
          e.preventDefault()
          editor?.chain().focus().toggleBlockquote().run()
        }}>
          Quote
        </button>
        <button className={editor.isActive('bulletList') ? 'is-active' : ''} onClick={(e) => {
          e.preventDefault()
          editor?.chain().focus().toggleBulletList().run()
        }}>
          Bullet
        </button>
        <button className={editor.isActive('codeBlock') ? 'is-active' : ''} onClick={(e) => {
          e.preventDefault()
          editor?.chain().focus().toggleCodeBlock().run()
        }}>
          Code
        </button>
        <button className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''} onClick={(e) => {
          e.preventDefault()
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }}>
          H1
        </button>
        <button className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''} onClick={(e) => {
          e.preventDefault()
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }}>
          H2
        </button>
        <button className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''} onClick={(e) => {
          e.preventDefault()
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }}>
          H3
        </button>
        <button className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''} onClick={(e) => {
          e.preventDefault()
          editor?.chain().focus().toggleHeading({ level: 4 }).run()
        }}>
          H4
        </button>
        <button className={editor.isActive('orderedList') ? 'is-active' : ''} onClick={(e) => {
          e.preventDefault()
          editor?.chain().focus().toggleOrderedList().run()
        }}>
          Ordered List
        </button>
        <button className={editor.isActive('strike') ? 'is-active' : ''} onClick={(e) => {
          e.preventDefault()
          editor?.chain().focus().toggleStrike().run()
        }}>
          Strike
        </button>
        <button className={editor.isActive('italic') ? 'is-active' : ''} onClick={(e) => {
          e.preventDefault()
          editor?.chain().focus().toggleItalic().run()
        }}>
          Italics
        </button>
        <div className="button-group">
          <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
            Set link
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive('link')}
          >
            Unset link
          </button>
        </div>
        <button onClick={(e) => {
          e.preventDefault()
          editor?.commands.setHorizontalRule()
        }}>
          _
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

export default TiptapForDocs
