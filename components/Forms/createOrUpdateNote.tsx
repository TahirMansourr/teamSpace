'use client'
import React, { useState } from 'react'
import Tiptap from '../TipTapEditor/TipTap'
import { Button, LoadingOverlay, Modal } from '@mantine/core'
import { useNotesContext } from '../Contexts/NotesContext'
import { NotesDto } from '@/Utils/types'
import { MdOutlineDeleteSweep, MdSaveAlt } from 'react-icons/md'
import { useDisclosure } from '@mantine/hooks'

const CreateOrUpdateNote = ({existingNoteContent , close} : {existingNoteContent? : NotesDto , close : ()=>void}) => {
    const { formLoading, handleCreateNote , handleUpdateNote, handleDeleteNote} = useNotesContext()
    const [content, setContent] = useState<string>(existingNoteContent ? existingNoteContent.body : '')
    const [deleteModalOpened , {open : openDeleteModal , close : closeDeleteModal}] = useDisclosure(false)

    let creationDate;
    let updateDate;
    if (existingNoteContent) {
        creationDate = new Date(existingNoteContent.createdAt)
        updateDate = existingNoteContent.updatedAt ? new Date(existingNoteContent.updatedAt) : null
    }

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
                
                <div className='flex w-full mr-0 border justify-between items-center p-2 rounded-lg shadow-md'>
                     <div className='flex flex-col text-sm gap-1'>
                    {existingNoteContent && (
                        <p className='text-xs text-gray-600'>
                            Created: {creationDate?.toLocaleString()}
                        </p>
                    )}
                    {existingNoteContent && updateDate && (
                        <p className='text-xs text-gray-600'>
                            Last Updated: {updateDate.toLocaleString()}
                        </p>
                    )}
                  </div>
                  <div className='flex items-center'>

                    <MdOutlineDeleteSweep size={25} color='red' onClick={openDeleteModal} className='hover:cursor-pointer' />
                    {/* <Button  className='m-2' size='sm' onClick={()=>{} } variant='transparent'></Button> */}
                    <Button type="submit" variant='transparent' className='m-2 mr-0' size='sm'><MdSaveAlt size = {25} /></Button>
                  </div>
                </div>
            </form>
            <Modal 
                opened={deleteModalOpened} 
                bg={'cyan'}
                onClose={closeDeleteModal} 
                withCloseButton = {false}
                overlayProps={{
                    backgroundOpacity: 0.7,
                    blur: 4,
                }}
                className='bg-transparent'
                >
                    <div className="flex flex-col items-center p-6 text-center">
                        <LoadingOverlay visible={formLoading} />
                        <div className="mb-5">
                            <MdOutlineDeleteSweep size={50} className="text-red-500" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">Delete Note</h2>
                        <p className="text-gray-600 mb-6">
                            This action cannot be undone. Are you sure you want to delete this note?
                        </p>
                        <div className="flex gap-4">
                            <Button 
                                onClick={closeDeleteModal}
                                variant="outline"
                                className="px-6"
                            >
                                No, Keep It
                            </Button>
                        {existingNoteContent?._id && <Button 
                                // onClick={handleDelete}
                                color="red"
                                className="px-6"
                                onClick={(e)=>{
                                    handleDeleteNote(existingNoteContent?._id , closeDeleteModal , e , close)
                                }}

                            >
                                Yes, Delete
                            </Button>}
                        </div>
                    </div>
            </Modal>
        </>
    )
}

export default CreateOrUpdateNote
