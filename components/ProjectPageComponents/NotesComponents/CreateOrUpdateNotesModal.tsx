import CreateOrUpdateNote from '@/components/Forms/createOrUpdateNote'
import CreateOrUpdateTaskForm, { createTaskFormDto } from '@/components/Forms/createTaskForm'
import { NotesDto, TaskDto } from '@/Utils/types'
import { Modal } from '@mantine/core'
import React from 'react'

const CreateOrUpdateNotesModal = ({modalOpened , closeModal , initialValues} : {modalOpened : boolean , closeModal : () => void , initialValues? : NotesDto}) => {
  return (
    <Modal 
      opened={modalOpened} 
      bg={'cyan'}
      onClose={closeModal} 
      withCloseButton = {false}
      overlayProps={{
        backgroundOpacity: 0.2,
        blur: 4,
      }}
      className='bg-transparent'
    >
    <CreateOrUpdateNote existingNoteContent={initialValues}/>
  </Modal>
  )
}

export default CreateOrUpdateNotesModal