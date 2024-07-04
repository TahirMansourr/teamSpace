'use client'
import { Button , Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'
import { RiExpandUpDownLine } from "react-icons/ri";
import { Table } from '@mantine/core';
import CreateTaskForm from '@/components/Forms/createTaskForm';
import { useTaskContext } from '@/components/Contexts/TasksContext';
import TaskTableComponent from './taskTableComponent';


const AllTasksPage = () => {
    const [modalOpened , {open , close : closeModal}] = useDisclosure(false)
  return (
    <main className=' flex flex-col w-full h-full border shadow-xl rounded-md'>
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
          <CreateTaskForm/>
        </Modal>
        <section className='flex justify-between items-center m-2 '>
            <div></div>
          <div>
            <Text size='lg'>TaskBoard</Text>
          </div>
          <Button onClick={open}>Create a new Task</Button>
        </section>
        <TaskTableComponent/>
    </main>
  )
}

export default AllTasksPage