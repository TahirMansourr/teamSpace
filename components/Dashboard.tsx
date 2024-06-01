'use client'

import React, { useState } from 'react'
import DashBoardSideBar from './dashBoardSideBar'
import Projects from '@/app/dashboard/@projects/page'
import ProjectsComponent from './projectsComponent'
import Messages from './messagesComponent'
import Meetings from './meetings'
import Notifications from './notifications'


const Dashboard = () => {

  const [selectedItemInSideBar , setSelectedItemInSideBar] = useState<string>('projects')
 
  const selectedItemInSideBarToRenderOnScreen = () : React.ReactNode=>{
    switch (selectedItemInSideBar) {
      case 'projects':
         return <ProjectsComponent/>
        break;
      case 'messages':
        return <Messages/>
        break;
      case 'meetings':
       return <Meetings/>
      case 'notifications':
        return <Notifications/>
      default:
        break;
    }
  
}
  return (
    <div className=' flex h-screen '>
        <DashBoardSideBar 
        setSelectedItemInSideBar={ setSelectedItemInSideBar }
        SelectedItemInSideBar={selectedItemInSideBar}
        />
        { selectedItemInSideBarToRenderOnScreen()}
    </div>
  )
}

export default Dashboard