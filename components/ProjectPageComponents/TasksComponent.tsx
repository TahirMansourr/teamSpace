'use client'
import { Text } from '@mantine/core'
import React from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'

const TasksComponent = () => {
    const {tasksComponentExpandState ,setTasksComponentExpandState} = useWorkSpaceContext()
    return (
    <article  className={`transition-all ease-in-out duration-200 flex flex-col bg-white rounded-md shadow-sm p-2 ${tasksComponentExpandState ? 'opacity-0 overflow-hidden' : 'opacity-100 w-[20rem] h-full'}`}
    style={{
        width: tasksComponentExpandState ? '0' : '20rem',
        height: tasksComponentExpandState ? '0' : '100%',
        padding: tasksComponentExpandState ? '0' : '1rem',
    }}>
         <header className=' flex justify-between'> 
          <Text size="xl" fw={600}>Tasks:</Text>
          <div 
          className='hover:cursor-pointer'
          onClick={()=>setTasksComponentExpandState(true)}
          >x</div>
         </header>
         <section>
  
         </section>
        </article>
    )
}

export default TasksComponent