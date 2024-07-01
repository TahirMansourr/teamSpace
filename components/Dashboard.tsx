'use client'

import React, { useEffect, useState } from 'react'
import DashBoardSideBar from './dashBoardSideBar'
import { SelectedItemInSideBarToRenderOnScreen } from '@/utils'
import axios from 'axios'
import { GetUserInfo } from '@/app/Utils'

const Dashboard = () => {

  const [selectedItemInSideBar , setSelectedItemInSideBar] = useState<string>('projects')
  const [opened , setOpened] = useState<boolean>(false)
  const [user , setUser] = useState<any>()
  
  useEffect(()=>{
    const getUserInfoAndSetState = async() => {
    const user = await GetUserInfo()
    setUser(user)
    }
   getUserInfoAndSetState()
  },[])
  
  return (
    
    <main className=' flex h-screen w-screen '>
     
       { user && 
       <DashBoardSideBar 
          setSelectedItemInSideBar={ setSelectedItemInSideBar }
          SelectedItemInSideBar={selectedItemInSideBar}
          setOpened = {setOpened}
          user = {user}
          />
          }
        {user && 
        <SelectedItemInSideBarToRenderOnScreen
          selectedItemInSideBar={selectedItemInSideBar}
          setOpened = {setOpened}
          opened = {opened}
          user = {user}
        />
        }
    </main>
  )
}

export default Dashboard