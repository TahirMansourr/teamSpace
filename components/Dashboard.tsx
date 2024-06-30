'use client'

import React, { useEffect, useState } from 'react'
import DashBoardSideBar from './dashBoardSideBar'
import { SelectedItemInSideBarToRenderOnScreen } from '@/utils'
import axios from 'axios'

const Dashboard = () => {

  const [selectedItemInSideBar , setSelectedItemInSideBar] = useState<string>('projects')
  const [opened , setOpened] = useState<boolean>(false)
  const [user , setUser] = useState<any>()
  
  useEffect(()=>{
    const getUserInfo = async() => {
     try {
      const user = await axios.get('api/users/userInfo')
      console.log("🚀 ~ getUserInfo ~ user:", user)
      setUser(user.data)
     } catch (error : any) {
      console.log(error);
     }
    }
   getUserInfo()
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