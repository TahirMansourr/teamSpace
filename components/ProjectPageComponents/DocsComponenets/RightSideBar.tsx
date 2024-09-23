'use client'
import { useDocsContext } from '@/components/Contexts/DocsContext'
import { Button } from '@mantine/core'
import React, { Dispatch, SetStateAction } from 'react'
import { TfiSave } from 'react-icons/tfi'

const RightSideBar = ({
  edit , 
  setEdit,
  content
} : {
  edit : boolean , 
  setEdit : Dispatch<SetStateAction<boolean>>,
  content : string
}) => {

  const {handleUpdateFile} = useDocsContext()
  return (
    <div className=' w-full'>
      <div className='flex mx-auto'>
        <Button 
          onClick={() => setEdit(!edit)}
          className=''
          >
          {edit ? 'Preview' : 'Edit'}
        </Button>
        <Button variant='transparent'>
        <TfiSave 
          size={30}
          onClick={() => {
            handleUpdateFile({content })
            setEdit(false)
          }}
          />
        </Button>
      </div>       
    </div>
  )
}

export default RightSideBar