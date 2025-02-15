'use client'
import {ScrollArea} from '@mantine/core'
import React from 'react'
import { useWorkSpaceContext } from '../../Contexts/WorkSpaceContext'
import TaskProvider from '../../Contexts/TasksContext'
import TeamSpaceTask from './teamSpaceTask'
import CreateOrUpdateTaskModal from './CreateTaskModal'
import { useDisclosure } from '@mantine/hooks'
import ComponentWrapper from '../MultiTabsComponentWrapper'

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
                     <TeamSpaceTask />
            </TaskProvider>
         </section>
    </ComponentWrapper>
    )
}

export default TasksComponent