'use client'
import { ScrollArea } from '@mantine/core'
import React from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'
import TeamSpaceNotes from './NotesComponents/TeamSpaceNotes'
import NotesProvider from '../Contexts/NotesContext'
import { useDisclosure } from '@mantine/hooks'
import CreateOrUpdateNotesModal from './NotesComponents/CreateOrUpdateNotesModal'
import MultiTabsComponentWrapper from './MultiTabsComponentWrapper'

const NotesComponent = () => {

    const {notesComponentExpandState ,setNotesComponentExpandState , projectInfo , userInfo} = useWorkSpaceContext()
    const [modalOpened , {open , close : closeModal}] = useDisclosure(false)
  
  return (
    <NotesProvider project={projectInfo.project} user={userInfo}>
      <MultiTabsComponentWrapper 
          componentExpandState={notesComponentExpandState}
          componentName='Notes'
          stateSetter={setNotesComponentExpandState}
          modalOpener={open}
          >
          <CreateOrUpdateNotesModal modalOpened = {modalOpened} closeModal={closeModal}/>
          <ScrollArea h={600} w={'100%'}>
            <TeamSpaceNotes/>
          </ScrollArea>
      </MultiTabsComponentWrapper>
    </NotesProvider>

  )
}

export default NotesComponent