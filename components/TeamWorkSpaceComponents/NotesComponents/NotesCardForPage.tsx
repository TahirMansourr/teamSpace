'use client'
import { NotesDto } from '@/Utils/types'
import { useDisclosure } from '@mantine/hooks';
import React from 'react'
import NotesModal from './NotesModal';

const NotesCardForPage = ({note} : {note : NotesDto}) => {
    const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className=' border rounded-md shadow-lg h-44 w-44' onClick={open}>
        <div dangerouslySetInnerHTML={{__html : note.body}} className=' p-2 overflow-hidden'></div>
            <NotesModal note = {note} opened = {opened} closeFirsModal={close}/>
    </div>
  )
}

export default NotesCardForPage