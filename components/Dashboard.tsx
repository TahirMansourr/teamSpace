'use client'

import React, { useEffect, useState } from 'react'
import DashBoardSideBar from './dashBoardSideBar'
import { SelectedItemInSideBarToRenderOnScreen } from '@/utils'
import axios from 'axios'

const Dashboard = () => {

  const [selectedItemInSideBar , setSelectedItemInSideBar] = useState<string>('projects')
  const [opened , setOpened] = useState<boolean>(false)
  useEffect(()=>{
    const getUserInfo = async() => {
     try {
      await axios.get('api/users/userInfo')
     } catch (error : any) {
      console.log(error);
      
     }
    }
   getUserInfo()
  },[])
  
  return (
    <main className=' flex h-screen w-screen '>
        <DashBoardSideBar 
          setSelectedItemInSideBar={ setSelectedItemInSideBar }
          SelectedItemInSideBar={selectedItemInSideBar}
          setOpened = {setOpened}
          />
        <SelectedItemInSideBarToRenderOnScreen
          selectedItemInSideBar={selectedItemInSideBar}
          setOpened = {setOpened}
          opened = {opened}
        />
    </main>
  )
}

export default Dashboard