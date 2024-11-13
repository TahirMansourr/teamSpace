'use client'
import { Transition } from '@mantine/core'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import IssuesProvider from '../../Contexts/IssuesContext'
import { useWorkSpaceContext } from '../../Contexts/WorkSpaceContext'
import AllIssues from '../IssuesComponents/AllIssues'

const IssuesPageComponent = ({
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

      const {projectInfo , userInfo} = useWorkSpaceContext()
      
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
                <IssuesProvider project={projectInfo.project} user={userInfo}>
                  <AllIssues/>
                </IssuesProvider>
                
              </div>
         </section>
         )
         }
        </Transition>
      )
}

export default IssuesPageComponent