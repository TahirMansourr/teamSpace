'use client'
import { Button, Transition } from '@mantine/core'
import React, { useEffect } from 'react'
import ProjectCardComponent from './projectCardComponent'

const ProjectsComponent = (
  { 
    opened , setOpened
  } : {
    opened : boolean , setOpened : Function
  }) => {

  useEffect(()=>{
    setOpened(true)
    return () => setOpened(false)
  })

  return (
    <Transition
        mounted={opened}
        transition="fade-up"
        duration={600}
        timingFunction="ease"
      >
    {
    (styles) =>(
       <section className='m-5 w-full flex flex-col gap-5 p-4' style={styles}>
          <div className=' flex justify-between items-center w-full'>
            <h1 className='text-3xl font-bold shadow-sm'>My Projects</h1>
            <Button size='lg'>Create New Project</Button>
          </div>
          <div className=' grid'>
            <ProjectCardComponent/>
          </div>
     </section>
     )
     }
    </Transition>
  )
}

export default ProjectsComponent