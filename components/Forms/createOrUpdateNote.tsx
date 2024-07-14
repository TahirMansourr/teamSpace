'use client'
import React, { useState } from 'react'
import Tiptap from '../TipTapEditor/TipTap'
import { useForm } from '@mantine/form'
import { Button, LoadingOverlay } from '@mantine/core'
import { useNotesContext } from '../Contexts/NotesContext'

const CreateOrUpdateNote = () => {
    const {formLoading, handleCreateNote} = useNotesContext()
    const [content , setContent] = useState<string>('')
    console.log("🚀 ~ CreateOrUpdateNote ~ content:", content)
    const handleContentChange = (contents : any)=>{
        setContent(contents)
    }
    const form = useForm({
        mode : 'uncontrolled',
        initialValues : {
            body : content
        }
    })
    const handleSubmit = async () => {
        form.setFieldValue('body' , content)
        console.log("🚀 ~ handleSubmit ~ values:", content)
        await handleCreateNote(content)
       
    }
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible = {formLoading} />
        <Tiptap 
            tipTapContent={content}
            onChange={(newContent : string) =>handleContentChange(newContent)}
            
            />
        <Button type='submit'>sumbit</Button>
    </form>
    
  )
}

export default CreateOrUpdateNote