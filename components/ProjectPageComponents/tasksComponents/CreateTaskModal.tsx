import CreateTaskForm from '@/components/Forms/createTaskForm'
import { TaskDto } from '@/Utils/types'
import { Modal } from '@mantine/core'
import React from 'react'

const CreateTaskModal = ({modalOpened , closeModal , initialValues} : {modalOpened : boolean , closeModal : () => void , initialValues? : TaskDto}) => {
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
    <CreateTaskForm close = {closeModal} updateFormInput = {initialValues} />
  </Modal>
  )
}

export default CreateTaskModal