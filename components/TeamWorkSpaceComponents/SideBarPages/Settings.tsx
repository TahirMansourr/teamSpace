'use client'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useWorkSpaceContext } from '../../Contexts/WorkSpaceContext'
import { TransitionWrapper } from '../TransitionWrapper'

const Settings = ({
    opened,
    setOpened
}:{
    opened : boolean,
    setOpened : Dispatch<SetStateAction<boolean>>
}) => {

    useEffect(()=>{
        setOpened(true)
        return ()=>setOpened(false)
      })

      const {userInfo , projectInfo} = useWorkSpaceContext()
      
      return (
        <TransitionWrapper opened = {opened}>
          <section className=' w-full h-screen' >
              <div className='  flex flex-col h-full w-full  gap-2 rounded-xl   items-center p-3' >
                <section className='w-full h-full'>
                  Settings
                </section>
              </div>
         </section>
        </TransitionWrapper>

      )
}

export default Settings