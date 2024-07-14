import CreateOrUpdateNote from '@/components/Forms/createOrUpdateNote'
import CreateOrUpdateTaskForm, { createTaskFormDto } from '@/components/Forms/createTaskForm'
import { TaskDto } from '@/Utils/types'
import { Modal } from '@mantine/core'
import React from 'react'

const CreateOrUpdateNotesModal = ({modalOpened , closeModal , initialValues} : {modalOpened : boolean , closeModal : () => void , initialValues? : TaskDto}) => {
  return (
    <Modal 
      opened={modalOpened} 
      onClose={closeModal} 
      title="Create New Note"
      withCloseButton = {false}
      overlayProps={{
        backgroundOpacity: 0.2,
        blur: 4,
      }}
    >
    <CreateOrUpdateNote/>
  </Modal>
  )
}

export default CreateOrUpdateNotesModal