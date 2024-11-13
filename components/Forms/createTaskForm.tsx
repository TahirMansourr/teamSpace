'use client'

import { Button, LoadingOverlay, Modal, MultiSelect, Select, TagsInput, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { DateInput } from '@mantine/dates';
import { useTaskContext } from '../Contexts/TasksContext';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { useDisclosure } from '@mantine/hooks';

export type createTaskFormDto = {
    name : string,
    description : string,
    priority : 'HIGH' | 'MEDIUM' | 'LOW',
    dueDate : Date,
    assignedTo : string[] ,
    tags : string[],
    status : 'To Do' | 'In Progress' | "Done" | 'Review'
    _id? : string,
    featureId? : string
}

const CreateOrUpdateTaskForm = ({close , updateFormInput , featureId  } : {close : Function , updateFormInput? : createTaskFormDto , featureId? : string }) => {
   
    const form = useForm<createTaskFormDto>({
        mode : 'uncontrolled',
        initialValues : {
            name : updateFormInput? updateFormInput.name :'',
            description : updateFormInput ? updateFormInput.description : '',
            priority : updateFormInput ? updateFormInput.priority :'HIGH',
            dueDate : updateFormInput? updateFormInput.dueDate : new Date,
            assignedTo :updateFormInput? updateFormInput.assignedTo : [],
            tags : updateFormInput? updateFormInput.tags :[],
            status : updateFormInput ? updateFormInput.status :'To Do',
            _id : updateFormInput ? updateFormInput._id : '',
            featureId : featureId ? featureId : ''
        }
    })

    const {useHandleCreateTask , projectInfo } = useTaskContext()
    const [formLoading , handleCreateTask , handleUpdateTask , handleDeleteTask] = useHandleCreateTask()
    const [open , setOpen] = useState<boolean>(false)
    const [deleteModalOpened , {open :openDeleteModal , close :closeDeleteModal}] = useDisclosure(false)

  return (
    <form onSubmit={form.onSubmit((values) => !updateFormInput ? handleCreateTask(values , close()) : handleUpdateTask(values , close()))}>
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
                data={projectInfo.team.map((member : any) =>{return member.username}) }
                key={form.key('assignedTo')}
                {...form.getInputProps('assignedTo')}
                />
                <div className="w-full mt-5 flex gap-2 justify-end">
                    {updateFormInput && (
                        <Button 
                            color="red" 
                            variant="outline" 
                            className="w-1/2" 
                            onClick={openDeleteModal}
                        >
                             <MdOutlineDeleteSweep size={25} className="text-red-500" />
                        </Button>
                    )}
                    <Button type='submit' className={updateFormInput ? 'w-1/2' : 'w-full'}>
                        {updateFormInput ? 'Update Task' : 'Create Task'}
                    </Button>
                </div>  
                  <Modal 
                        opened={deleteModalOpened}
                        onClose={closeDeleteModal}
                        withCloseButton={false}
                        overlayProps={{
                            backgroundOpacity: 0.8,
                            blur: 4,
                        }}
                        className='bg-transparent'
                    >
                        <div className="flex flex-col items-center p-6 text-center">
                            <LoadingOverlay visible={formLoading} />    
                            <div className="mb-5">
                                <MdOutlineDeleteSweep size={50} className="text-red-500" />
                            </div>
                            <h2 className="text-xl font-bold mb-2">Delete Task</h2>
                            <p className="text-gray-600 mb-6">
                                This action cannot be undone. Are you sure you want to delete this task?
                            </p>
                            <div className="flex gap-4">
                                <Button 
                                    onClick={closeDeleteModal}
                                    variant="outline"
                                    className="px-6"
                                >
                                    No, Keep It
                                </Button>
                              {updateFormInput &&  
                                <Button 
                                    onClick={() => handleDeleteTask(updateFormInput._id as string , closeDeleteModal , close())}
                                    color="red"
                                    className="px-6"
                                >
                                    Yes, Delete
                                </Button>}
                            </div>
                        </div>
                  </Modal>        
        </div>
    </form>
  )
}

export default CreateOrUpdateTaskForm