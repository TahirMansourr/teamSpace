'use client'
import { Button, Modal, Transition } from '@mantine/core'
import React, { useEffect } from 'react'
import ProjectCardComponent from './projectCardComponent'
import { useDisclosure } from '@mantine/hooks'
import CreateProjectForm from '../Forms/createProjectForm'
import { useProjectContext } from '../Contexts/ProjectContext'

const ProjectsComponent = (
  { 
    opened , setOpened , userId
  } : {
    opened : boolean , setOpened : Function , userId : string
  }) => {

    const [modalOpened , {open , close : closeModal}] = useDisclosure(false)
    const {userProjects} = useProjectContext()
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
          onClose={closeModal} 
          title="Create New Project"
          withCloseButton = {false}
          overlayProps={{
            backgroundOpacity: 0.2,
            blur: 4,
          }}
          >
            <CreateProjectForm close = {closeModal} userId  = {userId} />
        </Modal>

          <div className=' flex justify-between items-center w-full'>
            <h1 className='text-3xl font-bold shadow-sm'>My Projects</h1>
            <Button size='md' onClick={open}>Create New Project</Button>
          </div>
          <div className=' flex flex-col mt-5 p-1 rounded-lg'>
            {userProjects && userProjects.length < 1 ? 
            <h1>Create Your first Project</h1> : 
            userProjects.map((project: any , index : number) => {
             return <ProjectCardComponent project = {project}/>
            })}
          </div>
     </section>
     )
     }
    </Transition>
  )
}

export default ProjectsComponent