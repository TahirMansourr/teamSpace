'use client'
import { NotesDto } from '@/Utils/types'
import { Modal, Spoiler } from '@mantine/core'
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
    <section className=' rounded-md  shadow-md flex flex-col justify-between my-2 border w-[90%] p-2 mx-auto min-h-[15rem] '>
      <CreateOrUpdateNotesModal modalOpened = {modalOpened} closeModal={closeModal} initialValues={Note} />
         <Spoiler maxHeight={150} showLabel="..." hideLabel="Hide">
           <div className=' text-xs font-light whitespace-pre-line' dangerouslySetInnerHTML={{ __html: sanitizedContent  }}>
                
           </div> 
        </Spoiler>
        <footer className='flex justify-between items-center'>
            
                <div className='flex text-xs gap-2'>
                  <p className=' text-gray-600'>{ date.toLocaleDateString()} {date.toLocaleTimeString()}</p>
                </div>
                <div className='flex text-xs gap-2'>
                <p className=' text-gray-600 font-bold'>{Note.creator.username}</p>  
                </div>
                <div>

                <FiEdit className=' ml-auto hover:cursor-pointer mr-3' onClick={open}/>
                </div>
               
            
        </footer>
        
    </section>
  )
}

export default NotesCard