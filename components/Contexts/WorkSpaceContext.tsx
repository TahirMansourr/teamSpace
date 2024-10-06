'use client'
import { UpdateUser } from "@/lib/actions/UserActions";
import { ProjectDto, UserDto } from "@/Utils/types";
import { notifications } from "@mantine/notifications";
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type projectInfoResponse = {
    status : string,
    project : ProjectDto,
    message : string
}
interface WorkSpaceContextDto{
    notesComponentExpandState : boolean
    tasksComponentExpandState : boolean
    issuesComponentExpandState : boolean
    chatComponentExpandState : boolean
    setNotesComponentExpandState : Dispatch<SetStateAction<boolean>>
    setTasksComponentExpandState : Dispatch<SetStateAction<boolean>>
    setIssuesComponentExpandState: Dispatch<SetStateAction<boolean>>
    setChatComponentExpandState: Dispatch<SetStateAction<boolean>>
    projectInfo : projectInfoResponse
    userInfo : UserDto,
    handleUpdateUser : (params: 
        {
            id : string ,
             username ? : string , 
             email? : string , 
             image? : string
        }
    ) => Promise<{status : string, message : string} | undefined>
}

const WorkSpaceContext = createContext<WorkSpaceContextDto>({} as WorkSpaceContextDto)

export const useWorkSpaceContext = () => {
    return useContext(WorkSpaceContext);
};

const WorkSpaceProvider = (
    {
        children,
        projectInfo,
        userInfo
    }
    :
    {
        children : React.ReactNode
        projectInfo? : projectInfoResponse
        userInfo : UserDto
    }
)=>{
    const [ notesComponentExpandState , setNotesComponentExpandState] = useState<boolean>(false)
    const [ tasksComponentExpandState , setTasksComponentExpandState] = useState<boolean>(false)
    const [ issuesComponentExpandState , setIssuesComponentExpandState] = useState<boolean>(false)
    const [ chatComponentExpandState , setChatComponentExpandState] = useState<boolean>(false)
    const [project  ,setProject] = useState<projectInfoResponse>(projectInfo ? projectInfo : { } as projectInfoResponse)
    const [user , setUser] = useState<UserDto>(userInfo)

    
    const handleUpdateUser = async (params : {id : string, username ? : string, email? : string, image? : string})=>{
       const response = await UpdateUser(params)
       console.log("🚀 ~ handleUpdateUser ~ params:", params)
       console.log("🚀 ~ handleUpdateUser ~ response:", response)
       if(response?.status === 'success'){
       notifications.show({message : response.message , color : 'blue'})
       console.log(response);
       setUser((prev : UserDto) => ({...prev , ...params}))
       return response
        }else{
            notifications.show({message : response?.message, color : 'red'})
            console.log(response);
            
            return response
        }
        }
       
   

    return(
        
        <WorkSpaceContext.Provider
            value={{
                notesComponentExpandState,
                setNotesComponentExpandState,
                tasksComponentExpandState ,
                setTasksComponentExpandState,
                issuesComponentExpandState ,
                setIssuesComponentExpandState,
                chatComponentExpandState ,
                setChatComponentExpandState,
                projectInfo : project,
                userInfo : user,
                handleUpdateUser
            }}
            >
            {children}
        </WorkSpaceContext.Provider>
    )
}

export default WorkSpaceProvider;