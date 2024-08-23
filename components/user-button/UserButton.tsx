'use client'
import { Avatar, Menu, Modal } from '@mantine/core'
import React from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'
import { TbLogout2 } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import AccountSettings from './AccountSettings';



const UserButton = () => {
    const router = useRouter()
    const {userInfo} = useWorkSpaceContext()
    console.log("🚀 ~ UserButton ~ userInfo:", userInfo)
    const [opened, { open, close }] = useDisclosure(false);

    const handleSignOut = async () => {
        await axios.get('/api/users/signOut')
        router.push('/signIn')
        console.log('logged you out');
        
    }
  return (
    <div>
        <Modal 
            opened={opened} 
            onClose={close} 
            withCloseButton = {false}
            overlayProps={{
                backgroundOpacity: 0.7,
                blur: 4,
              }}
            size={'xl'}
            >
             <AccountSettings user = {userInfo} />
         </Modal>
      <Menu shadow="md" width={200}>
             <Menu.Target>
                <div className='flex flex-col justify-center items-center gap-3 hover:cursor-pointer '>
                    <Avatar src={userInfo.image} size={60} className='!hover:scale-105'/>
                    <div className="flex flex-col items-center">
                        <p className='font-bold text-lg'>{userInfo.username}</p>
                        <p className='text-sm'>{userInfo.email}</p>
                    </div>
                </div> 
        </Menu.Target>
        <Menu.Dropdown>
            <Menu.Label>{userInfo.email}</Menu.Label>
            <Menu.Item 
                leftSection = {<IoIosSettings />}
                onClick={open}
                >
                  Settings
            </Menu.Item>
            <Menu.Divider />
            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item 
                leftSection = {<TbLogout2 /> }
                onClick = {() => {handleSignOut()}}
                >
                  logout
            </Menu.Item>
      </Menu.Dropdown>
      </Menu>
    </div>
  )
}

export default UserButton