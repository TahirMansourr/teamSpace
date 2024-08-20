'use client'
import { Avatar, Menu } from '@mantine/core'
import React from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'
import { TbLogout2 } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";



const UserButton = () => {
    const {userInfo} = useWorkSpaceContext()
  return (
    <div>
      <Menu shadow="md" width={200}>
             <Menu.Target>
                <div className='flex items-center gap-3 hover:cursor-pointer'>
                    <Avatar src={userInfo.image} size={60} className='!hover:scale-105'/>
                    <div className="flex flex-col">
                        <p className='font-bold text-lg'>{userInfo.username}</p>
                        <p className='text-sm'>{userInfo.email}</p>
                    </div>
                </div>
                
             </Menu.Target>
             <Menu.Dropdown>
        <Menu.Label>{userInfo.email}</Menu.Label>
        <Menu.Item leftSection = {<IoIosSettings />} >
          Settings
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item leftSection = {<TbLogout2 />}>
          logout
        </Menu.Item>
      </Menu.Dropdown>
      </Menu>
    </div>
  )
}

export default UserButton