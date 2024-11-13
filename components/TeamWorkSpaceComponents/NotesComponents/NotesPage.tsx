'use client'
import { Transition } from '@mantine/core'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import AllNotes from './AllNotes'
import NotesProvider from '../../Contexts/NotesContext'
import { useWorkSpaceContext } from '../../Contexts/WorkSpaceContext'

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
        <Transition
            mounted={opened}
            transition="fade-left"
            duration={600}
            timingFunction="ease"
          >
        {
        (styles) =>(
           <section className='m-5 w-full' style={styles}>
              <div className=' flex items-center w-full justify-center'>
              <NotesProvider project={projectInfo.project} user={userInfo} >
                <AllNotes/>
              </NotesProvider>
              </div>
         </section>
         )
         }
        </Transition>
      )
}

export default NotesPageComponent