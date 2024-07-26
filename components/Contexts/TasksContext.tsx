'use client'
import { CreateTask, UpdateTask } from "@/lib/actions/TaskActions";
import React, { createContext, useContext, useEffect, useState } from "react";
import { socket } from "@/socket";
import { ProjectDto, TaskDto, UserDto } from "@/Utils/types";
import { notifications } from "@mantine/notifications";

type formValuesType = {
    name : string,
    description : string,
    priority : 'HIGH' | 'MEDIUM' | 'LOW',
    dueDate : Date,
    assignedTo : string[],
    tags : string[],
    status : 'To Do' | 'In Progress' | "Done" | 'Review'
    _id? : string
}
type TaskContextDto = {
    useHandleCreateTask : () => [ 
        boolean , 
        (values : formValuesType , close : ()=>void)=>Promise<void> , 
        (values: formValuesType , close : ()=> void) => Promise<void>
    ]
    projectInfo : ProjectDto,
    allTasks : TaskDto[]
}
const TaskContext = createContext<TaskContextDto>({} as TaskContextDto)
export const useTaskContext = () => {
    return useContext(TaskContext)
}

const TaskProvider = ({
    children , user , project
} : {
    children : React.ReactNode ,
    user : UserDto ,
    project : {
        status : string ,
        message : string , 
        project :ProjectDto
    }
}) => {
    const [userInfo , setUserInfo] = useState<UserDto>(user)
    const [projectInfo , setProjectInfo] = useState<ProjectDto>(project.project)
    const [allTasks , setAllTasks] = useState<TaskDto[]>(project.project.Tasks ? project.project.Tasks : [] )

    const useHandleCreateTask = (): 
    [boolean, (values: formValuesType , close : ()=> void) => Promise<void> ,(values: formValuesType , close : ()=> void) => Promise<void>] => {
        
        const [formLoading , setFormLoading] = useState<boolean>(false) 
        async function handleCreateTask( values : formValuesType ,close : ()=> void){
            console.log("🚀 ~ handleCreateTask ~ values:", values)
            setFormLoading(true)
            const assignedToMembers  = values.assignedTo.map((name) =>{
                const assignedToMember = projectInfo.team.find( (member : UserDto) => name === member.username)
                return assignedToMember
            }).filter((id): id is UserDto => id !== undefined);
            try {
                CreateTask({
                    name : values.name,
                    assignedTo : assignedToMembers ? assignedToMembers.map((member : UserDto | undefined) => member ? member._id : '') : [],
                    description : values.description,
                    dueDate : values.dueDate,
                    priority : values.priority,
                    userId : userInfo._id,
                    projectId : projectInfo._id,
                    tags : values.tags,
                    status : values.status
                }).then((res) => {
                    const newTask = {
                      ...values , 
                      assignedTo : assignedToMembers,
                      _id : res.task._id,
                      creationDate : res.task.creationDate
                    } 
                    setAllTasks((prev : TaskDto[] | undefined) =>prev ? [newTask , ...prev  ] : [])
                    // socket.emit('createTask' , newTask)
                    // console.log('sent task' , newTask); 
                })
            } catch (error) {
                throw new Error(`error at handleCreateTask : ${error}`);
            }finally{
                setFormLoading(false)
                close
            }
        }
        async function handleUpdateTask(values : formValuesType , close : ()=> void){
            setFormLoading(true)
            const assignedToMembers = values.assignedTo.map((name) =>{
                const assignedToMember = projectInfo.team.find( (member : UserDto) => name === member.username)
                return assignedToMember
            }).filter((id): id is UserDto => id !== undefined);
                try {
                     await UpdateTask({
                        _id : values._id as string,
                        name : values.name,
                        assignedTo : assignedToMembers.map((member : UserDto | undefined) => member ? member._id : ''),
                        description : values.description,
                        dueDate : values.dueDate,
                        priority : values.priority,
                        userId : userInfo._id,
                        projectId : projectInfo._id,
                        tags : values.tags,
                        status : values.status
                     }).then((res : {status : string , task : TaskDto}) => {
                        const newTask = {
                          ...values , 
                          _id : res.task._id,
                          assignedTo : assignedToMembers,
                          creationDate : res.task.creationDate
                        }
                        setAllTasks(((prev : TaskDto[] )=> prev.map((prevTask : TaskDto) => prevTask._id === newTask._id ? newTask : prevTask)  ))

            
                        // socket.emit('updateTask' , newTask)
                        // console.log('sent task' , newTask); 
                    })
                } catch (error) {
                    throw new Error(`error at handleCreateTask : ${error}`);
                }finally{
                    setFormLoading(false)
                    close
                }
        }
        return [formLoading , handleCreateTask , handleUpdateTask]
    }

    useEffect(()=>{
        socket.on('createTask' , (task : TaskDto) => {
            setAllTasks((prev : TaskDto[]) => [task , ...prev  ])
        })
        socket.on('updateTask' , (task : TaskDto) => {
            console.log('recieved the task' , task);
            
            setAllTasks(((prev : TaskDto[] )=> prev.map((prevTask : TaskDto) => prevTask._id === task._id ? task : prevTask)  ))
            notifications.show({ message : `${task.name} updated` , color : 'blue'})
        })
    } ,[])

    const value = {
        useHandleCreateTask,
        projectInfo,
        allTasks
        }
    return(
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider