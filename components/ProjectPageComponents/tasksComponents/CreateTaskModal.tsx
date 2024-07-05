import CreateOrUpdateTaskForm, { createTaskFormDto } from '@/components/Forms/createTaskForm'
import { TaskDto } from '@/Utils/types'
import { Modal } from '@mantine/core'
import React from 'react'

const CreateOrUpdateTaskModal = ({modalOpened , closeModal , initialValues} : {modalOpened : boolean , closeModal : () => void , initialValues? : TaskDto}) => {
  return (
    <Modal 
      opened={modalOpened} 
      onClose={closeModal} 
      title="Create New Task"
      withCloseButton = {false}
      overlayProps={{
        backgroundOpacity: 0.2,
        blur: 4,
      }}
    >
    <CreateOrUpdateTaskForm close = {closeModal} updateFormInput = {initialValues as unknown as createTaskFormDto} />
  </Modal>
  )
}

export default CreateOrUpdateTaskModal