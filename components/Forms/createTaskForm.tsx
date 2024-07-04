'use client'

import { Button, LoadingOverlay, MultiSelect, Select, TagsInput, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { DateInput } from '@mantine/dates';
import { useTaskContext } from '../Contexts/TasksContext';

type createTaskFormDto = {
    name : string,
    description : string,
    priority : 'HIGH' | 'MEDIUM' | 'LOW',
    dueDate : Date,
    assignedTo : string[],
    tags : string[],
    status : 'To Do' | 'In Progress' | "Done" | 'Review'
}

const CreateTaskForm = ({close , updateFormInput} : {close : Function , updateFormInput? : createTaskFormDto}) => {
   
    const form = useForm<createTaskFormDto>({
        mode : 'uncontrolled',
        initialValues : {
            name : updateFormInput? updateFormInput.name :'',
            description : updateFormInput ? updateFormInput.description : '',
            priority : updateFormInput ? updateFormInput.priority :'HIGH',
            dueDate : updateFormInput? updateFormInput.dueDate : new Date,
            assignedTo :updateFormInput? updateFormInput.assignedTo : [],
            tags : updateFormInput? updateFormInput.tags :[],
            status : updateFormInput ? updateFormInput.status :'To Do' 

        }
    })

    const {useHandleCreateTask , projectInfo } = useTaskContext()
    const [formLoading , handleCreateTask] = useHandleCreateTask()
    const [open , setOpen] = useState<boolean>(false)

  return (
    <form onSubmit={form.onSubmit((values) => handleCreateTask(values , close))}>
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
            <TagsInput
                label="Tags"
                data={[]}
                key={form.key('tags')}
                {...form.getInputProps('tags')}
                />
            <DateInput
                valueFormat="DD/MM/YYYY HH:mm:ss"
                label="Date input"
                placeholder="Date input"
                key={form.key('dueDate')}
                {...form.getInputProps('dueDate')}
                className={`${open?  'mt-10' : null }`}
                />
            <MultiSelect
                label="Assign Task To"
                data={projectInfo.team.map((member : any) =>{return member.username})}
                key={form.key('assignedTo')}
                {...form.getInputProps('assignedTo')}
                />
                <div className="  w-full mt-5  ">
                   <Button type='submit' className=' w-full' w={'100%'}>Create Task</Button>
                </div>          
        </div>
    </form>
  )
}

export default CreateTaskForm