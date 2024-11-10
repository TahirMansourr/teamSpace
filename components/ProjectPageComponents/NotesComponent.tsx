'use client'
import { Code, Indicator, ScrollArea, Text, Tooltip } from '@mantine/core'
import React from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'
import TeamSpaceNotes from './NotesComponents/TeamSpaceNotes'
import NotesProvider from '../Contexts/NotesContext'
import { MdPlaylistAdd } from 'react-icons/md'
import { useDisclosure, useResizeObserver } from '@mantine/hooks'
import CreateOrUpdateNotesModal from './NotesComponents/CreateOrUpdateNotesModal'
import MultiTabsComponentWrapper from './MultiTabsComponentWrapper'

const NotesComponent = () => {

    const {notesComponentExpandState ,setNotesComponentExpandState , projectInfo , userInfo} = useWorkSpaceContext()
    const [modalOpened , {open , close : closeModal}] = useDisclosure(false)
  
  return (
    <NotesProvider project={projectInfo.project} user={userInfo}>
      <MultiTabsComponentWrapper componentExpandState={notesComponentExpandState}>
      <header className=' flex justify-between'> 
       {/* <Indicator color='teal' withBorder size={15} position='top-start'> */}
        <Text size="xl" fw={600}>Notes:</Text>
        {/* </Indicator> */}
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
      </MultiTabsComponentWrapper>
      </NotesProvider>

  )
}

export default NotesComponent