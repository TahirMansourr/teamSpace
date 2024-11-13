'use client'
import { CreateTask, DeleteTask, UpdateTask } from "@/lib/actions/TaskActions";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { socket } from "@/socket";
import { ProjectDto, TaskDto, UserDto } from "@/Utils/types";
import { notifications } from "@mantine/notifications";
import { useChannel } from "ably/react";

type formValuesType = {
    name : string,
    description : string,
    priority : 'HIGH' | 'MEDIUM' | 'LOW',
    dueDate : Date,
    assignedTo : string[],
    tags : string[],
    status : 'To Do' | 'In Progress' | "Done" | 'Review'
    _id? : string,
    featureId? : string
}
type TaskContextDto = {
    useHandleCreateTask : () => [ 
        boolean , 
        (values : formValuesType , close : ()=>void)=>Promise<void> , 
        (values: formValuesType , close : ()=> void) => Promise<void>,
        (taskId: string ,  close :() =>void , closeMainModal : () => void)=>Promise<void> 
    ]
    projectInfo : ProjectDto,
    allTasks : TaskDto[],
    allFeatureTasks : TaskDto[],
    formLoading : boolean
}
const TaskContext = createContext<TaskContextDto>({} as TaskContextDto)
export const useTaskContext = () => {
    return useContext(TaskContext)
}

const TaskProvider = ({
    children , user , project , featureTasks
} : {
    children : React.ReactNode ,
    user : UserDto ,
    project : {
        status : string ,
        message : string , 
        project :ProjectDto
    },
    featureTasks? : TaskDto[]
}) => {
    const [userInfo , setUserInfo] = useState<UserDto>(user)
    const [projectInfo , setProjectInfo] = useState<ProjectDto>(project.project)
    const [allTasks , setAllTasks] = useState<TaskDto[]>(project.project.Tasks ? project.project.Tasks : [] )
    const [allFeatureTasks , setAllFeatureTasks] = useState<TaskDto[]>(featureTasks ? featureTasks : [])
    const [formLoading , setFormLoading] = useState<boolean>(false)
    const didMountRef = useRef(false);

    //uncomment me to use ably{
    // const { channel } = useChannel('get-started',()=>{} )

    // useEffect(() => {
    //     channel.subscribe('create-task', (task) => {
    //     setAllTasks((prev : TaskDto[] | undefined) =>prev ? [task.data.task , ...prev  ] : [])
    //     if(task.data.featureId){
    //         setAllFeatureTasks((prev : TaskDto[] | undefined) => prev ? [task.data.task, ...prev] : [])
    //     }
    //   console.log("🚀 ~ const{channel}=useChannel ~ task:", task)
    //     });
    //     channel.subscribe('update-task', (task) => {
    //         setAllTasks(((prev : TaskDto[] )=> prev.map((prevTask : TaskDto) => prevTask._id === task.data._id ? task.data : prevTask)  ))
    //          setAllFeatureTasks(((prev : TaskDto[] )=> prev.map((prevTask : TaskDto) => prevTask._id === task.data._id ? task.data : prevTask)))
    //     })
    // } , [])}
    const useHandleCreateTask = (): 
    [boolean, (values: formValuesType , close : ()=> void) => Promise<void> ,(values: formValuesType ,
     close : ()=> void) => Promise<void> , (taskId: string , close: () => void , closeMainModal : ()=>void)=>Promise<void> ] => {
        
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
                    status : values.status,
                    featureId : values.featureId,
                }).then((res) => {
                    const newTask = {
                        ...values , 
                        assignedTo : assignedToMembers,
                        _id : res.task._id,
                        creationDate : res.task.creationDate,
                        createdBy : userInfo,
                    }
                    console.log("🚀 ~ file: TasksContext.tsx:97 ~ newTask:", newTask)
                    setAllTasks((prev : TaskDto[] | undefined) => prev ? [newTask, ...prev] : [newTask])
                    // setAllTasks(((prev : TaskDto[] )=> prev.map((prevTask : TaskDto) => {return prevTask._id === newTask._id ? newTask : prevTask}) ))
                    if(values.featureId){
                                setAllFeatureTasks((prev : TaskDto[] | undefined) => prev ? [newTask, ...prev] : [])
                            }
                    //uncomment me to use ably{
                    // channel.publish('create-task' , {task : newTask , featureId : values.featureId});}
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
                          creationDate : res.task.creationDate,
                          createdBy : userInfo,
                        }
                        setAllTasks(((prev : TaskDto[] )=> prev.map((prevTask : TaskDto) => prevTask._id === newTask._id ? newTask : prevTask)  ))
                        setAllFeatureTasks(((prev : TaskDto[] )=> prev.map((prevTask : TaskDto) => prevTask._id === newTask._id ? newTask : prevTask)))
                        //uncomment me to use ably
                        // channel.publish('update-task' , newTask);
            
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
         async function handleDeleteTask(taskId: string ,  close : ()=> void , closeMainModal : () =>void){
        setFormLoading(true);
            try {
                const response = await DeleteTask(taskId);
                if (response.status === 'success') {
                    setAllTasks((prev: TaskDto[]) => 
                        prev.filter(task => task._id !== taskId)
                    );
                    setAllFeatureTasks((prev: TaskDto[]) => 
                        prev.filter(task => task._id !== taskId)
                    );
                    notifications.show({ message: 'Task deleted successfully', color: 'green' });
                    
                    // Uncomment for Ably
                    // channel.publish('delete-task', { taskId });
                }
            } catch (error) {
                notifications.show({ message: 'Error deleting task', color: 'red' });
                throw new Error(`Error at handleDeleteTask: ${error}`);
            } finally {
                setFormLoading(false);
                close();
                closeMainModal;
            }
        }
        return [formLoading , handleCreateTask , handleUpdateTask , handleDeleteTask]
    }

    // useEffect(()=>{
    //     socket.on('createTask' , (task : TaskDto) => {
    //         setAllTasks((prev : TaskDto[]) => [task , ...prev  ])
    //     })
    //     socket.on('updateTask' , (task : TaskDto) => {
    //         console.log('recieved the task' , task);
            
    //         setAllTasks(((prev : TaskDto[] )=> prev.map((prevTask : TaskDto) => prevTask._id === task._id ? task : prevTask)  ))
    //         notifications.show({ message : `${task.name} updated` , color : 'blue'})
    //     })
    // } ,[])

    const value = {
        useHandleCreateTask,
        projectInfo,
        allTasks,
        allFeatureTasks, 
        formLoading
        }
    return(
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider