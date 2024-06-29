'use client'
import { Button, Modal, Transition } from '@mantine/core'
import React, { useEffect } from 'react'
import ProjectCardComponent from './projectCardComponent'
import { useDisclosure } from '@mantine/hooks'
import CreateProjectForm from '../Forms/createProjectForm'

const ProjectsComponent = (
  { 
    opened , setOpened
  } : {
    opened : boolean , setOpened : Function
  }) => {

    const [modalOpened , {open , close}] = useDisclosure(false)

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
        <Modal 
          opened={modalOpened} 
          onClose={close} 
          title="Create New Project"
          withCloseButton = {false}
          overlayProps={{
            backgroundOpacity: 0.2,
            blur: 4,
          }}
          >
            <CreateProjectForm/>
        </Modal>

          <div className=' flex justify-between items-center w-full'>
            <h1 className='text-3xl font-bold shadow-sm'>My Projects</h1>
            <Button size='md' onClick={open}>Create New Project</Button>
          </div>
          <div className=' flex flex-col mt-5 p-1 rounded-lg'>
            <ProjectCardComponent/>
          </div>
     </section>
     )
     }
    </Transition>
  )
}

export default ProjectsComponent