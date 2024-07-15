'use client'
import { Code, Indicator, ScrollArea, Text, Tooltip } from '@mantine/core'
import React from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'
import TeamSpaceNotes from './NotesComponents/TeamSpaceNotes'
import NotesProvider from '../Contexts/NotesContext'
import { MdPlaylistAdd } from 'react-icons/md'
import { useDisclosure, useResizeObserver } from '@mantine/hooks'
import CreateOrUpdateNotesModal from './NotesComponents/CreateOrUpdateNotesModal'

const NotesComponent = () => {

    const {notesComponentExpandState ,setNotesComponentExpandState , projectInfo , userInfo} = useWorkSpaceContext()
    const [modalOpened , {open , close : closeModal}] = useDisclosure(false)
  
  return (
    <NotesProvider project={projectInfo.project} user={userInfo}>
      <Indicator color='teal' withBorder size={15}>
    <article  className={`transition-all ease-in-out duration-200 border flex flex-col bg-white rounded-md shadow-xl p-2 ${notesComponentExpandState ? 'opacity-0 overflow-hidden' : 'opacity-100 w-[20rem] h-full flex-grow'}`}
    style={{
        width: notesComponentExpandState ? '0' : '20rem',
        height: notesComponentExpandState ? '0' : '100%',
        padding: notesComponentExpandState ? '0' : '1rem',
    }}
    >
       <header className=' flex justify-between'> 
        <Text size="xl" fw={600}>Notes:</Text>
        <section className=' flex items-center gap-3'>
          <div> 
              <Tooltip label = 'Create a new Task' color='blue'>
                  <MdPlaylistAdd size={25} color='blue' className=' hover:cursor-pointer' onClick={open}/>
              </Tooltip>
          </div>
          <div 
          className='hover:cursor-pointer'
          onClick={()=>setNotesComponentExpandState(true)}
          >x</div>
          </section>
       </header> 
       <section>
        
          <CreateOrUpdateNotesModal modalOpened = {modalOpened} closeModal={closeModal}/>
          <ScrollArea h={600} w={'100%'}>
            <TeamSpaceNotes/>
          </ScrollArea>
       </section>
      </article>
      </Indicator>
      </NotesProvider>

  )
}

export default NotesComponent