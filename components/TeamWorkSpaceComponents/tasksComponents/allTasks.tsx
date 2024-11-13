'use client'
import { Button , Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'
import TaskTableComponent from './taskTableComponent';
import CreateOrUpdateTaskModal from './CreateTaskModal';


const AllTasksPage = () => {
    const [modalOpened , {open , close : closeModal}] = useDisclosure(false)
  return (
    <main className=' flex flex-col w-full h-full border shadow-xl rounded-md'>
       <CreateOrUpdateTaskModal modalOpened = {modalOpened}  closeModal={closeModal}/>
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