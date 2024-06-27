'use client'
import { Text } from '@mantine/core'
import React from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'

const IssuesComponent = () => {
    const {issuesComponentExpandState ,setIssuesComponentExpandState} = useWorkSpaceContext()
    return (
    <article  className={`transition-all ease-in-out duration-200 flex flex-col  bg-white rounded-md shadow-xl p-2 ${issuesComponentExpandState ? 'opacity-0 overflow-hidden' : 'opacity-100 flex-grow w-[20rem] h-full'}`}
    style={{
        width: issuesComponentExpandState ? '0' : '20rem',
        height: issuesComponentExpandState ? '0' : '100%',
        padding: issuesComponentExpandState ? '0' : '1rem',
    }}>
         <header className=' flex justify-between'> 
          <Text size="xl" fw={600}>Issues:</Text>
          <div 
          className='hover:cursor-pointer'
          onClick={()=>setIssuesComponentExpandState(true)}
          >x</div>
         </header>
         <section>
  
         </section>
        </article>
    )
}

export default IssuesComponent