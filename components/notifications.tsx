'use client'
import { Button, Transition } from '@mantine/core'
import React, { useEffect } from 'react'

const Notification = ({opened , setOpened} : {opened : boolean , setOpened : Function}) => {
  useEffect(()=>{
    setOpened(true)
    return ()=>setOpened(false)
  })
  return (
    <Transition
        mounted={opened}
        transition="fade-up"
        duration={600}
        timingFunction="ease"
      >
    {
    (styles) =>(
       <section className='m-5 w-full' style={styles}>
          <div className=' flex justify-between items-center w-full'>
            <h1>Notification</h1>
          </div>
     </section>
     )
     }
    </Transition>
  )
}

export default Notification