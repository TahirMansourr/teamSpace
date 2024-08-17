'use client'
import { Button, Transition } from '@mantine/core'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import SingleDoc from './DocsComponenets/SingleDoc'
import DocsProvider from '../Contexts/DocsContext'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'

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
      const [edit , setEdit] = React.useState(false)
      
      return (
        <Transition
            mounted={opened}
            transition="fade-left"
            duration={600}
            timingFunction="ease"
          >
        {
        (styles) =>(
          <DocsProvider
            userInfo={userInfo}
            projectInfo={projectInfo.project}
            >
           <section className=' flex flex-grow ' style={styles}>
              <div className=' fixed right-2 top-2 '>
                {/* <Button variant='outline'>Create a new document</Button> */}
                <Button 
                  onClick={() => setEdit(!edit)}
                  className='mr-0'
                  >
                {edit ? 'Preview' : 'Edit'}
                   </Button>
              </div>
              <SingleDoc edit = {edit}/>
  
         </section>
         </DocsProvider>
         )
         }
        </Transition>
      )
}

export default Docs