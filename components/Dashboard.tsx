'use client'

import React, { useEffect, useState } from 'react'
import DashBoardSideBar from './dashBoardSideBar'
import { SelectedItemInSideBarToRenderOnScreen } from '@/utils'
import axios from 'axios'
import { GetUserInfo } from '@/app/Utils'
import WorkSpace from '@/app/project/[...id]/page'
import WorkSpaceProvider from './Contexts/WorkSpaceContext'
import { UserDto } from '@/Utils/types'

const Dashboard = () => {

  const [selectedItemInSideBar , setSelectedItemInSideBar] = useState<string>('projects')
  const [opened , setOpened] = useState<boolean>(false)
  const [user , setUser] = useState<UserDto>()
  const [userForContext , setUserForContext] = useState<UserDto>()
  console.log("🚀 ~ Dashboard ~ user:", user)
  
  useEffect(()=>{
    const getUserInfoAndSetState = async() => {
    const user = await GetUserInfo()
    setUser(user)
    setUserForContext(user.data)
    }
   getUserInfoAndSetState()
  },[])
  
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