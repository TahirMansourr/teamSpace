'use client'
import React, { useState } from 'react'
import Tiptap from '../TipTapEditor/TipTap'
import { Button, LoadingOverlay } from '@mantine/core'
import { useNotesContext } from '../Contexts/NotesContext'
import { NotesDto } from '@/Utils/types'

const CreateOrUpdateNote = ({existingNoteContent , close} : {existingNoteContent? : NotesDto , close : ()=>void}) => {
    const { formLoading, handleCreateNote , handleUpdateNote } = useNotesContext()
    const [content, setContent] = useState<string>(existingNoteContent ? existingNoteContent.body : '')

    const handleContentChange = (newContent: string) => {
        setContent(newContent)
    }

    const handleSubmit = async (e: React.FormEvent) => {
       
        
        if(!existingNoteContent){
        await handleCreateNote(content , close , e)
        }else{
        await handleUpdateNote({ ...existingNoteContent , body : content } , close , e)
        }
    }

    return (
        <>
            <LoadingOverlay visible={formLoading} />
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <Tiptap 
                    content={content}
                    onChange={(newContent: string) => handleContentChange(newContent)}
                />
                <Button type="submit" className='m-2 mr-0' size='sm'>Save</Button>
            </form>
        </>
    )
}

export default CreateOrUpdateNote
