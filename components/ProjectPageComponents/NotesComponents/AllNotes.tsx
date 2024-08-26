'use client'
import { useNotesContext } from '@/components/Contexts/NotesContext'
import { NotesDto } from '@/Utils/types'
import React from 'react'
import NotesCardForPage from './NotesCardForPage'

const AllNotes = () => {
    const {allNotes} = useNotesContext()
  return (
   <div className=' grid grid-cols-7 gap-5'>
     {
         allNotes.length > 0 ? 
        
        allNotes.map((note : NotesDto)=> <NotesCardForPage note = {note}/>)
    
         : 
        <div>
            No notes found
        </div>
    }
   </div>
  )
}

export default AllNotes