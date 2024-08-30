'use client'
import { useDocsContext } from '@/components/Contexts/DocsContext';
import { Button, Input, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { FaRegFolderOpen } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import { Tree } from '@mantine/core';

const LeftSideBar = () => {
    const [title , setTitle] = useState<string>('')
    const [create , setCreate] = useState<boolean>(false)
    const {handleCreateDoc , allDocs} = useDocsContext()
    const titles = allDocs.map((doc)=>doc.folder)
  return (
    <div className=' w-full flex flex-col items-center'>
        <Button variant='transparent' size = 'compact-sm' onClick={()=>{setCreate(true)}}> + new Doc</Button>
        <div className='w-full'>
            <Tree data={[]} />
        </div>
       { create ? 
       <div className='flex gap-1 mt-3 wfull mx-2'>
        <TextInput 
            leftSection={<FaRegFolderOpen />}
            value={title} 
            onChange={(e)=>{setTitle(e.target.value)}}
            rightSection = {
            <MdOutlineDone 
            color='green'
            onClick={async (e)=>{
                e.preventDefault();
                e.stopPropagation()
                await handleCreateDoc(title); 
                setCreate(false); 
                setTitle('')
            }}
            className='!hover:cursor-pointer z-50'
            />}
            />
       </div>  
       : null}
    </div>
  )
}

export default LeftSideBar