'use client'
import { Transition } from '@mantine/core'
import React, { Dispatch, SetStateAction, useEffect } from 'react'

const Docs = ({
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
      
      return (
        <Transition
            mounted={opened}
            transition="fade-left"
            duration={600}
            timingFunction="ease"
          >
        {
        (styles) =>(
           <section className='m-5 w-full' style={styles}>
              <div className=' flex justify-between items-center w-full'>
                <h1>messages</h1>
              </div>
         </section>
         )
         }
        </Transition>
      )
}

export default Docs