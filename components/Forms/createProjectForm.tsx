'use client'
import { CreateProject } from '@/lib/actions/ProjectActions'
import { Button, LoadingOverlay, TagsInput, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { useProjectContext } from '../Contexts/ProjectContext'
import { notifications } from '@mantine/notifications'

interface ProjectFormDto{
    name : string,
    team : string[],
    image : string,
    content : string,
}
const CreateProjectForm = ({close , userId} : {close : ()=> void , userId : string}) => {
    const {setUserProjects} = useProjectContext()

    const form = useForm<ProjectFormDto>({
        mode : 'uncontrolled' ,
        initialValues:{
            name : '',
            team : [],
            image: '',
            content : ''
        }
    })
    const [loading , setLoading] = useState<boolean>(false)
    const [response , setResponse] = useState<{status : string , message : string , project : any}>()
    
    async function handleSubmit(){
        const values = form.getValues()
        setLoading(true)
      try {
        
        CreateProject({
            name : values.name ,
            image : values.image,
            content : values.content, 
            admins : [userId]
        }).then((res : any) =>{
             setResponse(res)
             notifications.show({
              message : res.message,
              color : "green"
            })
            setUserProjects((prev : any) => [...prev , {
              name : values.name,
              image : values.image,
              content : values.content,
              admins : [userId]
            }])
            })
        console.log(form.getValues());
        close()
         
      } catch (error: any) {
        console.log(`error at createProjectForm : ${error}`);
      }finally{
        setLoading(false)
      }
    }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className=' w-full flex flex-col justify-center gap-1 '>
            {loading ? <div>Creating...<LoadingOverlay visible/></div> : null}
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
            
           {response && response.status === 'Fail' ?
              <div className={`p-3 rounded-md text-white w-fit mx-auto mt-4 text-center  bg-red-600`}>
                {response.message}
              </div> : null
            }
                <Button type='submit' className=' mt-3'>Create Project</Button>
        </div>
    </form>
  )
}

export default CreateProjectForm