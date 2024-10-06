'use client'

import React, {useState} from 'react'
import DashBoardSideBar from './dashBoardSideBar'
import { SelectedItemInSideBarToRenderOnScreen } from '@/utils'
import WorkSpaceProvider from './Contexts/WorkSpaceContext'
import useGetUserInfo from '@/app/Hooks/GetUserInfo'


const Dashboard = () => {

  const [selectedItemInSideBar , setSelectedItemInSideBar] = useState<string>('projects')
  const [opened , setOpened] = useState<boolean>(false)
  const { user ,  loading  , error  } = useGetUserInfo()
  console.log("🚀 ~ Dashboard ~ user:", user)
  
  
  return (
    
    <main className=' flex h-screen w-screen '>
     
       { user && !loading &&
       <WorkSpaceProvider userInfo={user}>

        <DashBoardSideBar 
            setSelectedItemInSideBar={ setSelectedItemInSideBar }
            SelectedItemInSideBar={selectedItemInSideBar}
            setOpened = {setOpened}
            />
      
        <SelectedItemInSideBarToRenderOnScreen
            selectedItemInSideBar={selectedItemInSideBar}
            setOpened = {setOpened}
            opened = {opened}
            user = {user}
            />
          
        </WorkSpaceProvider>
        }
    </main>
  
  )
}

export default Dashboard