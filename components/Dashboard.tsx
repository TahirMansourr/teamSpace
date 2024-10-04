'use client'

import React, {useState} from 'react'
import DashBoardSideBar from './dashBoardSideBar'
import { SelectedItemInSideBarToRenderOnScreen } from '@/utils'
import WorkSpaceProvider from './Contexts/WorkSpaceContext'
import useGetUserInfo from '@/app/Hooks/GetUserInfo'

const Dashboard = () => {

  const [selectedItemInSideBar , setSelectedItemInSideBar] = useState<string>('projects')
  const [opened , setOpened] = useState<boolean>(false)
  const {user , userForContext , loading} = useGetUserInfo()
  
  
  return (
    
    <main className=' flex h-screen w-screen '>
     
       { user && userForContext && 
       <WorkSpaceProvider userInfo={userForContext}>

        <DashBoardSideBar 
            setSelectedItemInSideBar={ setSelectedItemInSideBar }
            SelectedItemInSideBar={selectedItemInSideBar}
            setOpened = {setOpened}
            user = {user}
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