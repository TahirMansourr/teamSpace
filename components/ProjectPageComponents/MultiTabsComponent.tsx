'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import NotesComponent from './NotesComponent'
import TasksComponent from './TasksComponent'
import IssuesComponent from './IssuesComponent'
import ChatSpaceComponent from './ChatSpaceComponent'
import { Transition } from '@mantine/core'
import NotificationsBar from './NotificationsBar'
import axios from 'axios'
import { GetUserInfo } from '@/app/Utils'

const MultiTabsComponent = ({
    opened,
    setOpened
}:{
    opened : boolean,
    setOpened : Dispatch<SetStateAction<boolean>>
}) => {

   const [user , setUser] = useState<any>()
   
    useEffect(()=>{
        setOpened(true)
        const getUserInfoAndSetState = async () => {
          const user = await GetUserInfo()
          console.log("🚀 ~ getUserInfoAndSetState ~ user:", user.data)
          setUser(user.data)
          }
         getUserInfoAndSetState()
        return ()=>setOpened(false)
      } , [])

  return (
    <Transition
    mounted={opened}
    transition="fade-left"
    duration={600}
    timingFunction="ease"
  >
     {
        (styles) =>(
            <section className=' flex flex-col w-full  gap-2 rounded-xl   items-center justify-center p-3'>
            <NotificationsBar/>
          { user && <section className=" flex w-full h-full  gap-2  items-center" style={styles}>
            <NotesComponent/> 
            <TasksComponent/> 
            <IssuesComponent/>
            <ChatSpaceComponent user = {user}/>
            </section>}
            </section>
        )
     }
</Transition>
    
  )
}

export default MultiTabsComponent