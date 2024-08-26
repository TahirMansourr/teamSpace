'use client'
import { Transition } from '@mantine/core'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'

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
        <Transition
            mounted={opened}
            transition="fade-left"
            duration={600}
            timingFunction="ease"
          >
        {
        (styles) =>(
           <section className=' w-full h-screen' >
              <div className='  flex flex-col h-full w-full  gap-2 rounded-xl   items-center p-3' style={styles}>
                <section className='w-full h-full'>
                  Settings
                </section>
              </div>
         </section>
         )
         }
        </Transition>
      )
}

export default Settings