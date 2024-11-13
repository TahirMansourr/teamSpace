'use client'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import IssuesProvider from '../../Contexts/IssuesContext'
import { useWorkSpaceContext } from '../../Contexts/WorkSpaceContext'
import AllIssues from '../IssuesComponents/AllIssues'
import { TransitionWrapper } from '../TransitionWrapper'

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
        <TransitionWrapper opened = {opened}>
            <section className='m-5 w-full' >
              <div className=' flex justify-between items-center w-full'>
                <IssuesProvider project={projectInfo.project} user={userInfo}>
                  <AllIssues/>
                </IssuesProvider>
                
              </div>
         </section>
        </TransitionWrapper>
       
      )
}

export default IssuesPageComponent