'use client'

import React, { useState } from 'react'
import DashBoardSideBar from './dashBoardSideBar'
import { SelectedItemInSideBarToRenderOnScreen } from '@/utils'


const Dashboard = () => {

  const [selectedItemInSideBar , setSelectedItemInSideBar] = useState<string>('projects')
  const [opened , setOpened] = useState<boolean>(false)
 
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