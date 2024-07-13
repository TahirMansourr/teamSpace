'use client'
import { TaskDto, UserDto } from '@/Utils/types';
import { Badge, Spoiler } from '@mantine/core'
import React from 'react'
import { FiEdit } from "react-icons/fi";
import CreateOrUpdateTaskModal from './CreateTaskModal';
import { useDisclosure } from '@mantine/hooks';

const TaskCard = ({task } : {task : TaskDto}) => {
  const [modalOpened , {open , close : closeModal}] = useDisclosure(false)
    const date = new Date(task.dueDate)
    const creationDate = new Date(task.creationDate)
    const formattedCreationDate = creationDate.toLocaleDateString() + ' ' + creationDate.toLocaleTimeString()
  return (
    <section className='flex flex-col w-[95%] shadow-md m-2 rounded-md p-2 border'>
       <h1 className=' font-bold underline-offset-2 underline'>{task.name}</h1>
       <p className='my-1'>
       <Badge
          radius='md'
          size="sm"
          color={task.status === 'To Do' ? 'red':
          task.status === 'In Progress' ? 'yellow' :
          task.status === 'Done' ? 'green':
          task.status === 'Review' ? 'orange':
          'gray'
          }
          >
           {task.status ? task.status : 'no status yet'}
        </Badge>
       </p>
        <CreateOrUpdateTaskModal 
           modalOpened ={modalOpened} closeModal={closeModal} 
           initialValues = {{...task , dueDate : date , assignedTo : task.assignedTo.map((user : any) => user.username )}}
          />
       <h1 className=' text-sm font-bold my-2'>Due on: {date.toLocaleString()}</h1>
       <Spoiler maxHeight={40} showLabel="..." hideLabel="Hide">
           <div className=' text-xs font-light whitespace-pre-line'>
                {task.description}
           </div> 
        </Spoiler>
        <div className="flex flex-col mt-2">
            <h1 className=' font-bold '>Assigned To</h1>    
            <div className=' flex gap-2'>{task.assignedTo.map((user : UserDto) => (<Badge color="blue">{user.username}</Badge>))}</div>
            <FiEdit className=' ml-auto hover:cursor-pointer' onClick={open}/>
        </div>
        <footer className=' text-xs'>
          {task.creationDate ? formattedCreationDate : null}
        </footer>
    </section>
  )
}

export default TaskCard