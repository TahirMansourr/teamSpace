'use client'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { TransitionWrapper } from '../TransitionWrapper'

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
        <TransitionWrapper opened = {opened}>
          <section className='m-5 w-full'>
              <div className=' flex justify-between items-center w-full'>
                <h1>Activity</h1>
              </div>
         </section>
        </TransitionWrapper>
      )
}

export default Activity