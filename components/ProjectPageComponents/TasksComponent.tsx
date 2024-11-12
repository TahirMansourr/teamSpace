'use client'
import {ScrollArea} from '@mantine/core'
import React from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'
import TaskProvider from '../Contexts/TasksContext'
import TeamSpaceTask from './tasksComponents/teamSpaceTask'
import CreateOrUpdateTaskModal from './tasksComponents/CreateTaskModal'
import { useDisclosure } from '@mantine/hooks'
import ComponentWrapper from './MultiTabsComponentWrapper'

const TasksComponent = () => {
    const {tasksComponentExpandState ,setTasksComponentExpandState , projectInfo , userInfo} = useWorkSpaceContext()
    const [modalOpened , {open , close : closeModal}] = useDisclosure(false)

    return (
    <ComponentWrapper 
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
    </ComponentWrapper>
    )
}

export default TasksComponent