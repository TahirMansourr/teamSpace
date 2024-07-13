'use client'
import { NotesDto } from '@/Utils/types'
import { Spoiler } from '@mantine/core'
import React from 'react'
import { FiEdit } from 'react-icons/fi'

const NotesCard = ({Note} : {Note : NotesDto}) => {
    const date = new Date(Note.createdAt)
    const updateDate = Note.updatedAt ? new Date(Note.updatedAt) : null
    const FormattedDate = updateDate?.toDateString() + '' + updateDate?.toTimeString()
  return (
    <section className=' rounded-md bg-purple-400 shadow-md flex flex-col'>
         <Spoiler maxHeight={80} showLabel="..." hideLabel="Hide">
           <div className=' text-xs font-light whitespace-pre-line'>
                {Note.body}
           </div> 
        </Spoiler>
        <footer className='flex flex-col'>
            <p>{Note.creator.username}</p>
            <div className='flex items-center'>
                <div className='flex flex-col text-xs'>
                    createdAt :{date.toLocaleDateString()}
                    last Updated : {FormattedDate}
                </div>
                {/* <FiEdit className=' ml-auto hover:cursor-pointer' onClick={open}/> */}
            </div>
        </footer>
    </section>
  )
}

export default NotesCard