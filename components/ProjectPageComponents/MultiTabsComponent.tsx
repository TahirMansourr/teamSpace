'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import NotesComponent from './NotesComponent'
import TasksComponent from './TasksComponent'
import IssuesComponent from './IssuesComponent'
import ChatSpaceComponent from './ChatSpaceComponent'
import { Button, Transition , Modal } from '@mantine/core'
import NotificationsBar from './NotificationsBar'
import { useDisclosure } from '@mantine/hooks';
import CreateFeatureForm from '../Forms/createFeatureForm'
;
import FeatureProvider from '../Contexts/featureContext'

const MultiTabsComponent = ({
    opened,
    setOpened
}:{
    opened : boolean,
    setOpened : Dispatch<SetStateAction<boolean>>
}) => {
   
    useEffect(()=>{
        setOpened(true)
        return ()=>setOpened(false)
      } , [])

      const [Modalopened, { open, close }] = useDisclosure(false);

  return (
    <Transition
        mounted={opened}
        transition="fade-left"
        duration={600}
        timingFunction="ease"
        >
     {
        (styles) =>(
            <section className=' flex flex-col w-full  gap-2 rounded-xl   items-center justify-center p-3 pt-9'>
              <div className='flex w-full items-center'>
              <NotificationsBar/>
              <Modal opened={Modalopened} onClose={close} title="New Feature !!"  overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
              }}>
                <FeatureProvider>
                  <CreateFeatureForm/>
                </FeatureProvider>
                
              </Modal>
              <Button className='mr-0' onClick={open}> + new Feature</Button>
              </div>  
                <section className=" flex w-full h-full  gap-2  items-center" style={styles}>
                  <NotesComponent/> 
                  <TasksComponent/> 
                  <IssuesComponent/>
                  <ChatSpaceComponent />
                </section>
            </section>
        )
     }
    </Transition>
    
  )
}

export default MultiTabsComponent