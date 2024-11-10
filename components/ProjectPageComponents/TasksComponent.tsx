'use client'
import { HoverCard, ScrollArea, Text, Tooltip } from '@mantine/core'
import React from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'
import TaskProvider from '../Contexts/TasksContext'
import TeamSpaceTask from './tasksComponents/teamSpaceTask'
import { MdPlaylistAdd } from "react-icons/md"; 
import CreateOrUpdateTaskModal from './tasksComponents/CreateTaskModal'
import { useDisclosure } from '@mantine/hooks'
import MultiTabsComponentWrapper from './MultiTabsComponentWrapper'

const TasksComponent = () => {
    const {tasksComponentExpandState ,setTasksComponentExpandState , projectInfo , userInfo} = useWorkSpaceContext()
    const [modalOpened , {open , close : closeModal}] = useDisclosure(false)

    return (
    <MultiTabsComponentWrapper 
        componentExpandState={tasksComponentExpandState}
        componentName='Tasks'
        stateSetter={setTasksComponentExpandState}
        modalOpener={open}
        >
         <section className=' flex w-full'>
            <TaskProvider project={projectInfo} user={userInfo}>
             <CreateOrUpdateTaskModal modalOpened = {modalOpened} closeModal={closeModal}/>
                <ScrollArea h={600} w={'100%'}>
                     <TeamSpaceTask />
                </ScrollArea>
            </TaskProvider>
         </section>
    </MultiTabsComponentWrapper>
    )
}

export default TasksComponent