'use client'
import Tiptap from '@/components/TipTapEditor/TipTap'
import { NotesDto } from '@/Utils/types'
import { Spoiler } from '@mantine/core'
import React from 'react'
import { FiEdit } from 'react-icons/fi'
import DOMPurify from 'dompurify'
import CreateOrUpdateNotesModal from './CreateOrUpdateNotesModal'
import { useDisclosure } from '@mantine/hooks'

const NotesCard = ({Note} : {Note : NotesDto}) => {
    const date = new Date(Note.createdAt)
    const updateDate = Note.updatedAt ? new Date(Note.updatedAt) : null
    const FormattedDate = updateDate?.toLocaleDateString() + ' ' + updateDate?.toLocaleTimeString()
    const sanitizedContent = DOMPurify.sanitize(Note.body)
    const [modalOpened , {open , close : closeModal}] = useDisclosure(false)
  return (
    <section className=' rounded-md  shadow-md flex flex-col my-2'>
      <CreateOrUpdateNotesModal modalOpened = {modalOpened} closeModal={closeModal} initialValues={Note} />
         <Spoiler maxHeight={80} showLabel="..." hideLabel="Hide">
           <div className=' text-xs font-light whitespace-pre-line' dangerouslySetInnerHTML={{ __html: sanitizedContent  }}>
                
           </div> 
        </Spoiler>
        <footer className='flex flex-col'>
            <div className='flex flex-col'>
                <div className='flex text-xs gap-2'>
                   <p className='font-bold'>createdAt :</p>  <p className=' text-gray-600'>{ date.toLocaleDateString()} {date.toLocaleTimeString()}</p>
                    {/* last Updated : {FormattedDate} */}
                </div>
               { Note.updatedAt? <div className='flex text-xs gap-2'>
                   <p className='font-bold'>last Updated :</p>  <p className=' text-gray-600'>{FormattedDate}</p>  
                </div> : null}
                <div className='flex text-xs gap-2'>
                <p className='font-bold'>Created By : </p>  <p className=' text-gray-600'>{Note.creator.username}</p>  
                <FiEdit className=' ml-auto hover:cursor-pointer mr-3' onClick={open}/>
                </div>
               
            </div>
        </footer>
    </section>
  )
}

export default NotesCard