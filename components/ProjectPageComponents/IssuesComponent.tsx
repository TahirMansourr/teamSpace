'use client'
import { ScrollArea, Text, Tooltip } from '@mantine/core'
import React from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'
import { useDisclosure } from '@mantine/hooks'
import { MdPlaylistAdd } from 'react-icons/md'
import IssuesProvider from '../Contexts/IssuesContext'
import CreateOrUpdateIssuesModal from './IssuesComponents/CreateOrUpdateIssueModal'
import IssueCard from './IssuesComponents/IssuesCard'
import TeamSpaceIssue from './IssuesComponents/TeamSpaceIssue'

const IssuesComponent = () => {
    const {issuesComponentExpandState ,setIssuesComponentExpandState, projectInfo , userInfo} = useWorkSpaceContext()
    const [modalOpened , {open , close : closeModal}] = useDisclosure(false)
    return (
    <article  className={`transition-all ease-in-out duration-200 border flex flex-col  bg-white rounded-md shadow-xl p-2 ${issuesComponentExpandState ? 'opacity-0 overflow-hidden' : 'opacity-100 flex-grow w-[20rem] h-full'}`}
    style={{
        width: issuesComponentExpandState ? '0' : '20rem',
        height: issuesComponentExpandState ? '0' : '100%',
        padding: issuesComponentExpandState ? '0' : '1rem',
    }}>
         <header className=' flex justify-between items-center'> 
          <Text size="xl" fw={600}>Issues:</Text>
          <section className=' flex items-center gap-3'>
          <div> 
              <Tooltip label = 'Create a new Task' color='blue'>
                  <MdPlaylistAdd size={25} color='blue' className=' hover:cursor-pointer' onClick={open}/>
              </Tooltip>
          </div>
          <div 
          className='hover:cursor-pointer'
          onClick={()=>setIssuesComponentExpandState(true)}
          >x</div>
          </section>
          
        </header>
         <section>
            <IssuesProvider project={projectInfo.project} user={userInfo}>
                <CreateOrUpdateIssuesModal modalOpened = {modalOpened} closeModal={closeModal}/>
                    <ScrollArea h={600} w={'100%'}>
                        <TeamSpaceIssue/>
                    </ScrollArea>
            </IssuesProvider>
         </section>
        </article>
    )
}

export default IssuesComponent