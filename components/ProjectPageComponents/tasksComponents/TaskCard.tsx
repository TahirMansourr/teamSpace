import { Badge, Spoiler } from '@mantine/core'
import React from 'react'

const TaskCard = ({task} : {task : any}) => {
    const date = new Date(task.dueDate)
  return (
    <section className='flex flex-col w-[95%] shadow-md m-2 rounded-md p-2 border'>
       <h1 className=' font-bold'>{task.name}</h1>
       <h1 className=' text-sm font-bold my-1'>Due on: {date.toLocaleString()}</h1>
       <Spoiler maxHeight={40} showLabel="..." hideLabel="Hide">
           <div className=' text-xs font-light'>
                {task.description}
           </div> 
        </Spoiler>
        <div className="flex flex-col">
            <h1 className=' font-bold '>Assigned To</h1>
            <div className=' flex gap-2'>{task.assignedTo.map((user : any) => (<Badge color="blue">{user.username}</Badge>))}</div>
        </div>
    </section>
  )
}

export default TaskCard