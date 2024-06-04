'use client'

import React, { useState } from 'react'
import DashBoardSideBar from './dashBoardSideBar'
import Projects from '@/app/dashboard/@projects/page'
import ProjectsComponent from './projectComponents/projectsComponent'
import Messages from './messagesComponent'
import Meetings from './meetings'
import Notifications from './notifications'


const Dashboard = () => {

  const [selectedItemInSideBar , setSelectedItemInSideBar] = useState<string>('projects')
  const [opened , setOpened] = useState<boolean>(false)
 
  const selectedItemInSideBarToRenderOnScreen = () : React.ReactNode=>{
    switch (selectedItemInSideBar) {
      case 'projects':
         return <ProjectsComponent  opened = {opened} setOpened = {setOpened}/>
      case 'messages':
        return <Messages opened = {opened} setOpened = {setOpened}/>
      case 'meetings':
       return <Meetings opened = {opened} setOpened = {setOpened}/>
      case 'notifications':
        return <Notifications opened = {opened} setOpened = {setOpened}/>
      default:
        break;
    }
  
}
  return (
    <div className=' flex h-screen w-screen '>
        <DashBoardSideBar 
          setSelectedItemInSideBar={ setSelectedItemInSideBar }
          SelectedItemInSideBar={selectedItemInSideBar}
          setOpened = {setOpened}
          />
        { selectedItemInSideBarToRenderOnScreen()}
    </div>
  )
}

export default Dashboard