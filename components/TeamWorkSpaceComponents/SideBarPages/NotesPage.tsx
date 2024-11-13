'use client'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import AllNotes from '../NotesComponents/AllNotes'
import NotesProvider from '../../Contexts/NotesContext'
import { useWorkSpaceContext } from '../../Contexts/WorkSpaceContext'
import { TransitionWrapper } from '../TransitionWrapper'

const NotesPageComponent = ({
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
              <div className=' flex items-center w-full justify-center'>
              <NotesProvider project={projectInfo.project} user={userInfo} >
                <AllNotes/>
              </NotesProvider>
              </div>
         </section>
        </TransitionWrapper>
      )
}

export default NotesPageComponent