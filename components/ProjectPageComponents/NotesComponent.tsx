'use client'
import { ScrollArea, Text } from '@mantine/core'
import React from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'
import TeamSpaceNotes from './NotesComponents/TeamSpaceNotes'
import NotesProvider from '../Contexts/NotesContext'

const NotesComponent = () => {

    const {notesComponentExpandState ,setNotesComponentExpandState , projectInfo , userInfo} = useWorkSpaceContext()
  return (
    <article  className={`transition-all ease-in-out duration-200 border flex flex-col bg-white rounded-md shadow-xl p-2 ${notesComponentExpandState ? 'opacity-0 overflow-hidden' : 'opacity-100 w-[20rem] h-full flex-grow'}`}
    style={{
        width: notesComponentExpandState ? '0' : '20rem',
        height: notesComponentExpandState ? '0' : '100%',
        padding: notesComponentExpandState ? '0' : '1rem',
    }}>
       <header className=' flex justify-between'> 
        <Text size="xl" fw={600}>Notes:</Text>
        <div 
        className='hover:cursor-pointer'
        onClick={()=>setNotesComponentExpandState(true)}
        >x</div>
       </header>
       <section>
        <NotesProvider project={projectInfo.project} user={userInfo}>
          <ScrollArea h={600} w={'100%'}>
            <TeamSpaceNotes/>
          </ScrollArea>
        </NotesProvider>
       </section>
      </article>
  )
}

export default NotesComponent