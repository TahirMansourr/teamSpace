'use client'
import { UserDto } from '@/Utils/types'
import { Avatar, Button } from '@mantine/core'
import { MdDeleteOutline } from "react-icons/md";
import React, { useState } from 'react'
import UpdateUserForm from '../Forms/updateUserForm';

const AccountSettings = ({user} : {user : UserDto}) => {
  const [opened, setOpened] = useState(false);
  return (
    <main className='flex p-5  items-start '>
      <div className='flex flex-col justify-center items-center  pr-7'>
       <Avatar src={user.image} size={200}/>
       <h2 className=' font-serif'>{user.username}</h2>
       <h3 className=' font-mono text-slate-600'>{user.email}</h3>
      </div>
      <div className='flex flex-col w-full border shadow-md rounded-md h-full p-3 gap-3'>
      <div className={`${opened? "flex flex-col justify-start" : null}`}>
        <Button variant='gradient' size='sm' onClick={()=>setOpened(!opened)}>Edit My Profile</Button>
        <UpdateUserForm opened = {opened}/>
       </div>
       <div className='flex '>
       <Button variant='gradient'>Change My Password</Button>
        </div>
        <div>
        <Button variant='gradient' color='red' rightSection = {<MdDeleteOutline color='red' size={30}/>}>Delete My Account</Button>
        </div>
      </div>
     
    </main>
  )
}

export default AccountSettings