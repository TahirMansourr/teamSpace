'use client'
import React from 'react'
import { useProjectContext } from '../Contexts/ProjectContext'
import ProjectCardComponent from './projectCardComponent'
import { ScrollArea } from '@mantine/core'

const AllProjectsSection = () => {
    const {userProjects} = useProjectContext()
  return (
    <div className='flex flex-col mt-5 mx-3 p-1 rounded-lg gap-7'>
            {userProjects && userProjects.length < 1 ? 
            <h1>Create Your first Project</h1> : 
            
            userProjects.map((project: any , index : number) => {
             return <ProjectCardComponent project = {project} key = {index}/>
            })
            
           }
          </div>
  )
}

export default AllProjectsSection