'use client'
import { ScrollArea } from '@mantine/core'
import React from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'
import { useDisclosure } from '@mantine/hooks'
import IssuesProvider from '../Contexts/IssuesContext'
import CreateOrUpdateIssuesModal from './IssuesComponents/CreateOrUpdateIssueModal'
import TeamSpaceIssue from './IssuesComponents/TeamSpaceIssue'
import MultiTabsComponentWrapper from './MultiTabsComponentWrapper'

const IssuesComponent = () => {
    const {issuesComponentExpandState ,setIssuesComponentExpandState, projectInfo , userInfo} = useWorkSpaceContext()
    const [modalOpened , {open , close : closeModal}] = useDisclosure(false)
    return (
    <MultiTabsComponentWrapper 
        componentExpandState={issuesComponentExpandState}
        stateSetter={setIssuesComponentExpandState}
        componentName='Issues'
        modalOpener={open}
        >
         <section>
            <IssuesProvider project={projectInfo.project} user={userInfo}>
                <CreateOrUpdateIssuesModal modalOpened = {modalOpened} closeModal={closeModal}/>
                    <ScrollArea h={600} w={'100%'}>
                        <TeamSpaceIssue/>
                    </ScrollArea>
            </IssuesProvider>
         </section>
    </MultiTabsComponentWrapper>
    )
}

export default IssuesComponent