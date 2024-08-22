'use client'
import { Transition } from '@mantine/core'
import React, { Dispatch, SetStateAction, useEffect } from 'react'

const Activity = ({
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
                <h1>Activity</h1>
                <ul>
                    <li> i want to see what is happening in the project , tasks created , issues and everything that has been created </li>
                    <li> i want to see everything completed as well here or anything that changes its state ie from todo to pending</li>
                    <li> </li>
                    <li></li>
                </ul>
              </div>
         </section>
         )
         }
        </Transition>
      )
}

export default Activity