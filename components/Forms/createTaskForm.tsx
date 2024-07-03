'use client'

import { Button, LoadingOverlay, MultiSelect, Select, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'
import { DateInput } from '@mantine/dates';
import { useTaskContext } from '../Contexts/TasksContext';

type createTaskFormDto = {
    name : string,
    description : string,
    priority : 'HIGH' | 'MEDIUM' | 'LOW',
    dueDate : Date,
    assignedTo : string[]
}

const CreateTaskForm = () => {
    const form = useForm<createTaskFormDto>({
        mode : 'uncontrolled',
        initialValues : {
            name : '',
            description : '',
            priority : 'HIGH',
            dueDate : new Date,
            assignedTo : []
        }
    })

    const {useHandleCreateTask , projectInfo } = useTaskContext()
    const [formLoading , handleCreateTask] = useHandleCreateTask()
  return (
    <form onSubmit={form.onSubmit((values) => handleCreateTask(values))}>
        <div>
           <LoadingOverlay visible = {formLoading}/>
            <TextInput 
                placeholder="Task Name"
                label = 'Task Name' 
                key={form.key('name')}
                {...form.getInputProps('name')}
                />
            <Textarea 
                placeholder="Task Description"
                label = 'Task Description' 
                key={form.key('description')}
                {...form.getInputProps('description')}
                />
            <Select
                label="Priority"
                data={['LOW' , 'MEDIUM' , 'HIGH']}
                key={form.key('priority')}
                {...form.getInputProps('priority')}
                />
            <MultiSelect
                label="Assign Task To"
                data={projectInfo.team.map((member : any) =>{return member.username})}
                key={form.key('assignedTo')}
                {...form.getInputProps('assignedTo')}
                />
            <DateInput
                valueFormat="DD/MM/YYYY HH:mm:ss"
                label="Date input"
                placeholder="Date input"
                key={form.key('dueDate')}
                {...form.getInputProps('dueDate')}
                />
            <Button type='submit'>Create Task</Button>
        </div>
    </form>
  )
}

export default CreateTaskForm