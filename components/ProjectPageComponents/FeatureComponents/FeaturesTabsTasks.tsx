'use client'
import { TaskDto } from '@/Utils/types'
import React from 'react'
import TaskCard from '../tasksComponents/TaskCard'
import TaskProvider from '@/components/Contexts/TasksContext'
import { useWorkSpaceContext } from '@/components/Contexts/WorkSpaceContext'
import { Button } from '@mantine/core'
import CreateOrUpdateTaskModal from '../tasksComponents/CreateTaskModal'
import { useDisclosure } from '@mantine/hooks'
import { MdOutlineLibraryAdd } from "react-icons/md";

const FeaturesTabsTasks = ({featureTasks} : {featureTasks :{tasks :  TaskDto[] , id : string}} ) => {
    const {projectInfo , userInfo} = useWorkSpaceContext()
    const [modalOpened , {open , close : closeModal}] = useDisclosure(false)
  return (
    <TaskProvider project={projectInfo} user={userInfo}>
        
    <section className='flex flex-col w-full'>
        <MdOutlineLibraryAdd onClick={open} className=' ml-auto hover:cursor-pointer hover:scale-105' size={30} color='blue' />

        <CreateOrUpdateTaskModal modalOpened ={modalOpened} closeModal={closeModal} featureId={featureTasks.id} />
        {
            featureTasks.tasks.length != 0 ? featureTasks.tasks.map((task : TaskDto) => (
                <TaskCard task = {task}/>
            ))
         : <h1>No tasks yet</h1>}
    </section>
    </TaskProvider>
  )
}

export default FeaturesTabsTasks