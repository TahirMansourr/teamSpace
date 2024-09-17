import { Button } from '@mantine/core'
import React, { Dispatch, SetStateAction } from 'react'
import { TfiSave } from 'react-icons/tfi'

const RightSideBar = ({edit , setEdit} : {edit : boolean , setEdit : Dispatch<SetStateAction<boolean>>}) => {
  return (
    <div>
      <Button 
                  onClick={() => setEdit(!edit)}
                  className='mr-0'
                  >
                {edit ? 'Preview' : 'Edit'}
                </Button>
                <Button variant='transparent'>
                <TfiSave size={20}/>
                </Button>
    </div>
  )
}

export default RightSideBar