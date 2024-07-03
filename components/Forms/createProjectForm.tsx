'use client'
import { CreateProject } from '@/lib/actions/ProjectActions'
import { Button, LoadingOverlay, MultiSelect, Popover, TagsInput, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { useProjectContext } from '../Contexts/ProjectContext'
import { notifications } from '@mantine/notifications'
import { IoIosSearch } from "react-icons/io";
import { FindUser } from '@/lib/actions/UserActions'

interface ProjectFormDto{
    name : string,
    team : string[],
    image : string,
    content : string,
    wantedTeamMember : string
}
const CreateProjectForm = ({close , userId} : {close : ()=> void , userId : string}) => {
    const {setUserProjects} = useProjectContext()

    const form = useForm<ProjectFormDto>({
        mode : 'uncontrolled' ,
        initialValues:{
            name : '',
            team : [],
            image: '',
            content : '',
            wantedTeamMember : ''
        }
    })
    const [loading , setLoading] = useState<boolean>(false)
    const [overlayLoading , setOverlayLoading] = useState<boolean>(false)
    const [response , setResponse] = useState<{status : string , message : string , project : any}>()
    const [opened, setOpened] = useState(false);
    const [wantedUser , setWantedUser] = useState<{name : string , id : string , email : string}>()
    const [data , setdata] = useState<{name : string , id : string , email : string}[]>([])

    async function handleSubmit(){
        const values = form.getValues()
        setLoading(true)
        const TeamMembersIds = values.team.map((memberName : string) => {
          const membersId = data.find(item => item.name === memberName )
          return membersId?.id
        })
        console.log("🚀 ~ TeamMembersIds ~ TeamMembersIds:", TeamMembersIds)
      try {
        
        CreateProject({
            name : values.name ,
            image : values.image,
            content : values.content, 
            admins : [userId],
            team : TeamMembersIds as string[]
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

    async function handleSearch(){
      const param = form.getValues().wantedTeamMember
      setOverlayLoading(true)
      try {
        const requiredUser = await FindUser(param)
        setWantedUser(requiredUser.user)
      } catch (error : any) {
         throw new Error(`rrrrrrr : ${error}`);
         
      }finally{
        setOverlayLoading(false)
      }
    }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      { loading? <LoadingOverlay visible/> :
        <div className=' w-full flex flex-col justify-center gap-1 '>
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
                <Popover width="target" position="bottom" opened={opened} onChange={setOpened}>
                  <Popover.Target>
                  <TextInput
                      label="Find team members by usernames"
                      placeholder="Enter Project Description"
                       key={form.key('wantedTeamMember')}
                      {...form.getInputProps('wantedTeamMember')}
                      rightSection = {<IoIosSearch color='blue' onClick={() => {
                        setOpened((o) => !o)
                        handleSearch()
                      }} />}
                      />
                  </Popover.Target>

                  <Popover.Dropdown className=' w-full'>{
                    overlayLoading ? <LoadingOverlay visible /> : 
                    <div className='flex items-end gap-4' onClick={() => {
                      if (wantedUser) {
                          const userExists = data.some((item) => item.name === wantedUser.name);
                          if (userExists) {
                              notifications.show({ message: `${wantedUser.name} already added`, color: 'red' });
                              return;
                          } else {
                              setdata((prev) => [...prev, wantedUser]);
                              form.setFieldValue('team', [...form.getValues().team, wantedUser.name]);
                              setOpened(false);
                          }
                      }
                  }}>
                      <h1 className='hover:cursor-pointer text-lg font-bold'>{wantedUser?.name}</h1>
                      <p className='text-sm text-slate-500'>{wantedUser?.email}</p>
                    </div>
                    
                  }</Popover.Dropdown>
                </Popover>
           
             <MultiSelect
                label="manage team members"
                searchable
                data={data.map((item : any) => item.name)}
                key={form.key('team')}
                {...form.getInputProps('team')}
                className={`${opened ? 'mt-14' : null}`}
                />
            
           {response && response.status === 'Fail' ?
              <div className={`p-3 rounded-md text-white w-fit mx-auto mt-4 text-center  bg-red-600`}>
                {response.message}
              </div> : null
            }
                <Button type='submit' className=' mt-3'>Create Project</Button>
        </div>}
    </form>
  )
}

export default CreateProjectForm