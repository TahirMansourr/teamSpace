'use client'
import { TaskDto } from '@/Utils/types'
import React from 'react'
import TaskCard from '../tasksComponents/TaskCard'
import TaskProvider, { useTaskContext } from '@/components/Contexts/TasksContext'
import { useWorkSpaceContext } from '@/components/Contexts/WorkSpaceContext'
import { Button } from '@mantine/core'
import CreateOrUpdateTaskModal from '../tasksComponents/CreateTaskModal'
import { useDisclosure } from '@mantine/hooks'
import { MdOutlineLibraryAdd } from "react-icons/md";

const FeaturesTabsTasks = ({featureId} : {featureId : string} ) => {
   
    const [modalOpened , {open , close : closeModal}] = useDisclosure(false)
    const {allFeatureTasks} = useTaskContext()
  return (
    
        
    <section className='flex flex-col w-full'>
        <MdOutlineLibraryAdd onClick={open} className=' ml-auto hover:cursor-pointer hover:scale-105 shadow-md' size={30} color='blue' />

        <CreateOrUpdateTaskModal modalOpened ={modalOpened} closeModal={closeModal} featureId={featureId} />
        <div className="grid grid-cols-3 mt-4">
        {
            allFeatureTasks.length > 0 ? allFeatureTasks.map((task : TaskDto) => (
                <TaskCard task = {task}/>
            ))
         : <h1>No tasks yet</h1>}
        </div>
        
    </section>
  )
}

export default FeaturesTabsTasks