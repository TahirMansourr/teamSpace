'use client'
import { useDocsContext } from '@/components/Contexts/DocsContext';
import { Button, Input, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { FaRegFolderOpen } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import { Tree } from '@mantine/core';
import { CiFileOn } from "react-icons/ci";

const LeftSideBar = () => {
    const [title , setTitle] = useState<string>('')
    const [createFolder , setCreateFolder] = useState<boolean>(false)
    const [createFile , setCreateFile] = useState<boolean>(false)
    const [type , setType] = useState<'File' | 'Folder'>('File')
    const { handleCreateDoc , allDocs } = useDocsContext()
    const titles = allDocs.map((doc)=>doc.folder)
  return (
    <div className=' w-full flex flex-col items-center'>
      <div className="flex">
        <Button variant='transparent' size = 'compact-sm' onClick={()=>{
          setCreateFile(false)
          setCreateFolder(true)
          setType('Folder')}}> 
          <div className=' flex items-center justify-center'>
            +
            <FaRegFolderOpen />
          </div>
        </Button>
        <Button variant='transparent' size = 'compact-sm' onClick={()=>{
          setCreateFolder(false)
          setCreateFile(true)
          setType("File")}
          }>
        <div className=' flex items-center justify-center'>
            +
            <CiFileOn />
          </div>
        </Button>
      </div>
        
        <div className='w-full'>
            <Tree data={[]} />
        </div>
       { createFolder || createFile ? 
       <div className='flex gap-1 mt-3 wfull mx-2 items-center'>
        <TextInput 
            leftSection={ createFolder ? <FaRegFolderOpen /> : <CiFileOn />}
            value={title} 
            onChange={(e)=>{setTitle(e.target.value)}}
            />
        <MdOutlineDone 
        size={20}
            color='green'
            onClick={async (e)=>{
                e.preventDefault();
                e.stopPropagation()
                await handleCreateDoc(title , type); 
                setCreateFolder(false); 
                setCreateFile(false); 
                setTitle('')
            }}
            className='hover:cursor-pointer z-50'
            />
       </div>  
       : null}
    </div>
  )
}

export default LeftSideBar