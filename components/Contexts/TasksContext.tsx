'use client'
import { CreateTask } from "@/lib/actions/TaskActions";
import React, { createContext, useContext, useEffect, useState } from "react";
import { socket } from "@/socket";
import { ProjectDto, TaskDto, UserDto } from "@/Utils/types";

type formValuesType = {
    name : string,
    description : string,
    priority : 'HIGH' | 'MEDIUM' | 'LOW',
    dueDate : Date,
    assignedTo : string[],
    tags : string[],
    status : 'To Do' | 'In Progress' | "Done" | 'Review'
}
type TaskContextDto = {
    useHandleCreateTask : () => [boolean , (values : formValuesType , close : Function)=>Promise<void>]
    projectInfo : any,
    allTasks : any[]
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
    const [allTasks , setAllTasks] = useState<any[]>(project.project.Tasks ? project.project.Tasks : [] )

    const useHandleCreateTask = (): [boolean, (values: formValuesType , close : Function) => Promise<void>] => {
        
        const [formLoading , setFormLoading] = useState<boolean>(false) 
        async function handleCreateTask( values : formValuesType ,close : Function){
            console.log("🚀 ~ handleCreateTask ~ values:", values)
            setFormLoading(true)
            const assignedToMembersIds = values.assignedTo.map((name) =>{
                const assignedToMember = projectInfo.team.find( (member : UserDto) => name === member.username)
                return assignedToMember?._id as string
            })
            try {
                CreateTask({
                    name : values.name,
                    assignedTo : assignedToMembersIds,
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
                      _id : res.task._id
                    }
                    socket.emit('createTask' , newTask)
                    console.log('sent task' , newTask); 
                })
            } catch (error) {
                throw new Error(`error at handleCreateTask : ${error}`);
            }finally{
                setFormLoading(false)
                close()
            }
        }
        return [formLoading , handleCreateTask]
    }

    useEffect(()=>{
        socket.on('createTask' , (task : TaskDto) => {
            setAllTasks((prev : TaskDto[]) => [task , ...prev  ])
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