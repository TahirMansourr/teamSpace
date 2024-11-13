'use client'
import { ScrollArea } from '@mantine/core'
import React from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'
import { useDisclosure } from '@mantine/hooks'
import IssuesProvider from '../Contexts/IssuesContext'
import CreateOrUpdateIssuesModal from './IssuesComponents/CreateOrUpdateIssueModal'
import TeamSpaceIssue from './IssuesComponents/TeamSpaceIssue'
import ComponentWrapper from './MultiTabsComponentWrapper'

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
         <section>
            <IssuesProvider project={projectInfo.project} user={userInfo}>
                <CreateOrUpdateIssuesModal modalOpened = {modalOpened} closeModal={closeModal}/>
                    <ScrollArea  className="h-[calc(100vh-200px)]" w={'100%'}>
                        <TeamSpaceIssue/>
                    </ScrollArea>
            </IssuesProvider>
         </section>
    </ComponentWrapper>
    )
}

export default IssuesComponent