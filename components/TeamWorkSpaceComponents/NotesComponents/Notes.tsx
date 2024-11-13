'use client'
import { ScrollArea } from '@mantine/core'
import React from 'react'
import { useWorkSpaceContext } from '../../Contexts/WorkSpaceContext'
import TeamSpaceNotes from './TeamSpaceNotes'
import NotesProvider from '../../Contexts/NotesContext'
import { useDisclosure } from '@mantine/hooks'
import CreateOrUpdateNotesModal from './CreateOrUpdateNotesModal'
import ComponentWrapper from '../MultiTabsComponentWrapper'

const NotesComponent = () => {

    const {notesComponentExpandState ,setNotesComponentExpandState , projectInfo , userInfo} = useWorkSpaceContext()
    const [modalOpened , {open , close : closeModal}] = useDisclosure(false)
  
  return (
    <NotesProvider project={projectInfo.project} user={userInfo}>
      <ComponentWrapper 
          componentExpandState={notesComponentExpandState}
          componentName='Notes'
          stateSetter={setNotesComponentExpandState}
          modalOpener={open}
          >
          <CreateOrUpdateNotesModal modalOpened = {modalOpened} closeModal={closeModal}/>
            <TeamSpaceNotes/>
      </ComponentWrapper>
    </NotesProvider>

  )
}

export default NotesComponent