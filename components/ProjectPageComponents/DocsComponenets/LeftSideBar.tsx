'use client'
import { useDocsContext } from '@/components/Contexts/DocsContext';
import { Button, TextInput ,Tree  } from '@mantine/core'
import React, { useState } from 'react'
import { FaRegFolderOpen } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import { CiFileOn } from "react-icons/ci";
import FolderStructureWrapper from './FolderStructureWrapper';

const LeftSideBar = () => {

    const {allFolders , allFiles} = useDocsContext()
    const [title , setTitle] = useState<string>('')
    const [createFolder , setCreateFolder] = useState<boolean>(false)
    const [createFile , setCreateFile] = useState<boolean>(false)
    const [type , setType] = useState<'File' | 'Folder'>('File')
    const { handleCreateDoc  } = useDocsContext()
    // const titles = allDocs.map((doc)=>doc.name)
 
    return (
    <div className=' w-full flex flex-col items-center'>
      <div className="flex">
        <Button 
          variant='transparent' 
          size = 'compact-sm' 
          onClick={()=>{
          setCreateFile(false)
          setCreateFolder(true)
          setType('Folder')}}
          > 
          <div className=' flex items-center justify-center'>
            +
            <FaRegFolderOpen />
          </div>
        </Button>
        <Button 
          variant='transparent' 
          size = 'compact-sm' 
          onClick={()=>{
          setCreateFolder(false)
          setCreateFile(true)
          setType("File")}
          }
          >
        <div className=' flex items-center justify-center'>
            +
            <CiFileOn />
          </div>
        </Button>
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
        <FolderStructureWrapper 
          allFolders={allFolders}
          allFiles={allFiles}
        />
    </div>
  )
}

export default LeftSideBar