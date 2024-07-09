'use client'
import { useTaskContext } from '@/components/Contexts/TasksContext'
import React from 'react'
import TaskCard from './TaskCard'
const TeamSpaceTask = () => {
    const {allTasks} = useTaskContext()
  return (
  <main>
    {
        allTasks ? 
          allTasks.map((task : any) => (
              <TaskCard task = {task} />
          )) :
          <h1>No Tasks </h1>
    }
  </main>
  )
}

export default TeamSpaceTask