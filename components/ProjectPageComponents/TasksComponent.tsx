'use client'
import { HoverCard, ScrollArea, Text, Tooltip } from '@mantine/core'
import React from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'
import TaskProvider from '../Contexts/TasksContext'
import TeamSpaceTask from './tasksComponents/teamSpaceTask'
import { MdPlaylistAdd } from "react-icons/md"; 
import CreateTaskModal from './tasksComponents/CreateTaskModal'
import { useDisclosure } from '@mantine/hooks'

const TasksComponent = () => {
    const {tasksComponentExpandState ,setTasksComponentExpandState , projectInfo , userInfo} = useWorkSpaceContext()
    const [modalOpened , {open , close : closeModal}] = useDisclosure(false)

    return (
    <article  className={`transition-all ease-in-out duration-200 border flex flex-col bg-white rounded-md shadow-xl p-2 ${tasksComponentExpandState ? 'opacity-0 overflow-hidden' : 'opacity-100 w-[20rem] h-full flex-grow'}`}
    style={{
        width: tasksComponentExpandState ? '0' : '20rem',
        height: tasksComponentExpandState ? '0' : '100%',
        padding: tasksComponentExpandState ? '0' : '1rem',
    }}>
        
         <header className=' flex justify-between items-center'> 
          <Text size="xl" fw={600}>Tasks:</Text>
          <section className=' flex items-center gap-3'>
          <div>
              <Tooltip label = 'Create a new Task' color='blue'>
                  <MdPlaylistAdd size={25} color='blue' className=' hover:cursor-pointer' onClick={open}/>
              </Tooltip>
          </div>
          <div 
          className='hover:cursor-pointer'
          onClick={()=>setTasksComponentExpandState(true)}
          >x</div>
          </section>
          
         </header>
         <section className=' flex w-full'>
            <TaskProvider project={projectInfo} user={userInfo}>
             <CreateTaskModal modalOpened = {modalOpened} closeModal={closeModal}/>
                <ScrollArea h={600} w={'100%'}>
                     <TeamSpaceTask/>
                </ScrollArea>
            </TaskProvider>
         </section>
        </article>
    )
}

export default TasksComponent