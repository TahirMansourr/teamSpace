'use client'
import { Button, Transition } from '@mantine/core'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import SingleDoc from '../DocsComponenets/SingleDoc'
import DocsProvider from '../../Contexts/DocsContext'
import { useWorkSpaceContext } from '../../Contexts/WorkSpaceContext'
import { TfiSave } from "react-icons/tfi";
import { TransitionWrapper } from '../TransitionWrapper'

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

      const {userInfo , projectInfo} = useWorkSpaceContext()
      
      return (
       <TransitionWrapper opened = {opened}>
         <DocsProvider
            userInfo={userInfo}
            projectInfo={projectInfo.project}
            >
           <section className=' flex flex-grow '>
              <div className=' fixed right-2 top-2 '>
                
              </div>
              <SingleDoc />
  
         </section>
         </DocsProvider>
         </TransitionWrapper>
      )
}

export default Docs