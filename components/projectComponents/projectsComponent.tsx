'use client'
import { Button, Modal, ScrollArea, Transition } from '@mantine/core'
import React, { useEffect } from 'react'
import ProjectCardComponent from './projectCardComponent'
import { useDisclosure } from '@mantine/hooks'
import CreateProjectForm from '../Forms/createProjectForm'
import ProjectProvider, { useProjectContext } from '../Contexts/ProjectContext'
import AllProjectsSection from './AllProjectsSection'

const ProjectsComponent = (
  { 
    opened , setOpened , user
  } : {
    opened : boolean , setOpened : Function , user : any
  }) => {

    const [modalOpened , {open , close : closeModal}] = useDisclosure(false)

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
      <ProjectProvider user = {user}>
       <section className='m-5 w-full flex flex-col gap-5' style={styles}>
        <Modal 
          opened={modalOpened} 
          onClose={closeModal} 
          title="Create New Project"
          withCloseButton = {false}
          overlayProps={{
            backgroundOpacity: 0.2,
            blur: 4,
          }}
          >
            <CreateProjectForm close = {closeModal} userId  = {user.data._id} />
        </Modal>

          <div className=' flex justify-between items-center w-full'>
            <h1 className='text-3xl font-bold shadow-sm'>My Projects</h1>
            <Button size='md' onClick={open}>Create New Project</Button>
          </div>
          <ScrollArea w={'100%'}>
              <AllProjectsSection/>
          </ScrollArea>
          
     </section>
     </ProjectProvider>
     )
     }
    </Transition>
  )
}

export default ProjectsComponent