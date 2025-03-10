'use client'
import { ScrollArea } from '@mantine/core'
import React from 'react'
import { useWorkSpaceContext } from '../../Contexts/WorkSpaceContext'
import { useDisclosure } from '@mantine/hooks'
import IssuesProvider from '../../Contexts/IssuesContext'
import CreateOrUpdateIssuesModal from './CreateOrUpdateIssueModal'
import TeamSpaceIssue from './TeamSpaceIssue'
import ComponentWrapper from '../MultiTabsComponentWrapper'

const IssuesComponent = () => {
    const {issuesComponentExpandState ,setIssuesComponentExpandState, projectInfo , userInfo} = useWorkSpaceContext()
    const [modalOpened , {open , close : closeModal}] = useDisclosure(false)
    return (
    <ComponentWrapper 
        componentExpandState={issuesComponentExpandState}
        stateSetter={setIssuesComponentExpandState}
        componentName='Issues'
        modalOpener={open}
        >
         <section className=' flex w-full h-full'> 
            <IssuesProvider project={projectInfo.project} user={userInfo}>
                <CreateOrUpdateIssuesModal modalOpened = {modalOpened} closeModal={closeModal}/>
                        <TeamSpaceIssue/>
            </IssuesProvider>
         </section>
    </ComponentWrapper>
    )
}

export default IssuesComponent