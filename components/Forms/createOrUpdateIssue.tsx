'use client'

import { Button, LoadingOverlay, MultiSelect, Select, TagsInput, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { DateInput } from '@mantine/dates';
import { useTaskContext } from '../Contexts/TasksContext';
import { UserDto } from '@/Utils/types';
import { useIssuesContext } from '../Contexts/IssuesContext';
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext';

export type createOrUpdateIssueForm = {
    name : string,
    description : string,
    priority : 'HIGH' | 'MEDIUM' | 'LOW',
    dueDate : Date,
    assignedTo : string[] ,
    tags : string[],
    status : 'To Do' | 'In Progress' | "Done" | 'Review'
    _id? : string
}

const CreateOrUpdateIssueForm = ({close , updateFormInput } : {close : Function , updateFormInput? : createOrUpdateIssueForm }) => {
   
    const form = useForm<createOrUpdateIssueForm>({
        mode : 'uncontrolled',
        initialValues : {
            name : updateFormInput? updateFormInput.name :'',
            description : updateFormInput ? updateFormInput.description : '',
            priority : updateFormInput ? updateFormInput.priority :'HIGH',
            dueDate : updateFormInput? updateFormInput.dueDate : new Date,
            assignedTo :updateFormInput? updateFormInput.assignedTo : [],
            tags : updateFormInput? updateFormInput.tags :[],
            status : updateFormInput ? updateFormInput.status :'To Do',
            _id : updateFormInput ? updateFormInput._id : ''
        }
    })

    
    const [open , setOpen] = useState<boolean>(false)
    const { formLoading , handleCreateIssue , handleUpdateIssue} = useIssuesContext()
    const {projectInfo} = useWorkSpaceContext()

  return (
    <form onSubmit={form.onSubmit((values) => !updateFormInput ? handleCreateIssue(values , close()) : handleUpdateIssue(values , close()))}>
        <div>
           <LoadingOverlay visible = {formLoading}/>
            <TextInput 
                placeholder="Issue Name"
                label = 'Issue Name' 
                key={form.key('name')}
                {...form.getInputProps('name')}
                />
            <Textarea 
                placeholder="Description"
                label = 'Description' 
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
                data={projectInfo.project.team.map((member : UserDto) =>{return {label : member.username , value : member._id}}) }
                key={form.key('assignedTo')}
                {...form.getInputProps('assignedTo')}
                />
                <div className="  w-full mt-5  ">
                   <Button type='submit' className=' w-full' w={'100%'}>{updateFormInput ? 'Update Issue' : ' Create Issue'}</Button>
                </div>          
        </div>
    </form>
  )
}

export default CreateOrUpdateIssueForm