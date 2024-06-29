'use client'
import { CreateProject } from '@/lib/actions/ProjectActions'
import { Button, LoadingOverlay, TagsInput, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { NextResponse } from 'next/server'
import React, { useState } from 'react'
import { useProjectContext } from '../Contexts/ProjectContext'

interface ProjectFormDto{
    name : string,
    team : string[],
    image : string,
    content : string

}
const CreateProjectForm = () => {
    const {userInfo} = useProjectContext()

    const form = useForm<ProjectFormDto>({
        initialValues:{
            name : '',
            team : [],
            image: '',
            content : ''
        }
    })
    const [loading , setLoading] = useState<boolean>(false)
    const [response , setResponse] = useState<{status : string , message : string}>()
    async function handleSubmit(){
        const values = form.getValues()
        setLoading(true)
      try {
        
        CreateProject({
            name : values.name ,
            image : values.image,
            content : values.content, 
            admin : [userInfo.data._id]
        }).then((res : any) =>{
             setResponse(res)} )
        console.log(form.getValues());
      } catch (error: any) {
        console.log(`error at createProjectForm : ${error}`);
      }finally{
        setLoading(false)
      }
        
    }
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className=' w-full flex flex-col justify-center gap-1 '>
            {loading ? <LoadingOverlay visible/> : null}
            <TextInput
                label="Project Name"
                placeholder="Project Name"
                key={form.key('name')}
                {...form.getInputProps('name')}
                />
            <Textarea
                label="Description"
                placeholder="Enter Project Description"
                key={form.key('content')}
                {...form.getInputProps('content')}
                />
            <TagsInput 
                label = 'Invite members to the Project'
                {...form.getInputProps('team')}
                />
            
           {response ? <div className={`p-3 rounded-md${response.status === "Fail" ?' bg-red-600 ' : 'bg-green-500'} text-white w-fit mx-auto mt-4 text-center`}>{response.message}</div> : null}
                <Button type='submit' className=' mt-3'>Create Project</Button>
        </div>
    </form>
  )
}

export default CreateProjectForm