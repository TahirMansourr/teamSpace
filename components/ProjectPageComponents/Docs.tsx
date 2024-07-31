'use client'
import { Button, Transition } from '@mantine/core'
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
           <section className='m-5 w-full ' style={styles}>
              <div className=' flex justify-between items-center w-full '>
                <h1></h1>
                <Button variant='outline'>Create a new document</Button>
              </div>
              <div className='flex grow mt-7 w-full items-center justify-center'>
                <ul>
                  <li>Doc1</li>
                  <li>Doc2</li>
                  <li>Doc3</li>
                  <li>Doc4</li>
                  <li>Doc5</li>
                </ul>
              </div>
         </section>
         )
         }
        </Transition>
      )
}

export default Docs