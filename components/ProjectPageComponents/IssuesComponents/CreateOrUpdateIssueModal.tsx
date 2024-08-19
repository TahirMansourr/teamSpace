import CreateOrUpdateIssueForm from '@/components/Forms/createOrUpdateIssue'
import CreateOrUpdateTaskForm, { createTaskFormDto } from '@/components/Forms/createTaskForm'
import { TaskDto } from '@/Utils/types'
import { Modal } from '@mantine/core'
import React from 'react'

const CreateOrUpdateIssuesModal = ({
  modalOpened , 
  closeModal , 
  initialValues,
  FeatureId
} : {
  modalOpened : boolean , 
  closeModal : () => void , 
  initialValues? : TaskDto,
  FeatureId? : string
}) => {
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
    <CreateOrUpdateIssueForm 
      close = {closeModal} 
      updateFormInput = {initialValues as unknown as createTaskFormDto}
      featureId={FeatureId}
      />
  </Modal>
  )
}

export default CreateOrUpdateIssuesModal