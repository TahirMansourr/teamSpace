'use client'
import React, { useState } from 'react'
import Tiptap from '../TipTapEditor/TipTap'
import { Button, LoadingOverlay } from '@mantine/core'
import { useNotesContext } from '../Contexts/NotesContext'
import { NotesDto } from '@/Utils/types'

const CreateOrUpdateNote = ({existingNoteContent} : {existingNoteContent? : NotesDto }) => {
    const { formLoading, handleCreateNote , handleUpdateNote } = useNotesContext()
    const [content, setContent] = useState<string>(existingNoteContent ? existingNoteContent.body : '')

    const handleContentChange = (newContent: string) => {
        setContent(newContent)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!existingNoteContent){
        await handleCreateNote(content)
        }else{
        await handleUpdateNote({ ...existingNoteContent , body : content})
        }
    }

    return (
        <>
            <LoadingOverlay visible={formLoading} />
            <form onSubmit={handleSubmit}>
                <Tiptap 
                    tipTapContent={content}
                    onChange={(newContent: string) => handleContentChange(newContent)}
                />
                <Button type="submit" className='m-2'>Save</Button>
            </form>
        </>
    )
}

export default CreateOrUpdateNote
