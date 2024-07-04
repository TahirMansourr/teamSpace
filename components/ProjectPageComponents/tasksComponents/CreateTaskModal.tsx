'use client'
import CreateTaskForm from '@/components/Forms/createTaskForm'
import { Modal } from '@mantine/core'
import React from 'react'

const CreateTaskModal = ({modalOpened , closeModal} : {modalOpened : boolean , closeModal : () => void}) => {
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
    <CreateTaskForm close = {closeModal}/>
  </Modal>
  )
}

export default CreateTaskModal