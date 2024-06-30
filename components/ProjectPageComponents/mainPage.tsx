'use client'
import React, { useState } from 'react'
import NotificationsBar from './NotificationsBar';
import MultiTabsComponent from './MultiTabsComponent';
import { SelectedItemToRenderOnScreen } from '@/utils';

const MainPage = () => {
 
  const [selectedItemInSideBar , setSelectedItemInSideBar] = useState<string>('projects')
  const [opened , setOpened] = useState<boolean>(false)
  return (
   <div>hi</div>
  )
}

export default MainPage