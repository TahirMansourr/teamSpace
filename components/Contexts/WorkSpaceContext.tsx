'use client'
import { socket } from "@/socket";
import { ProjectDto, UserDto } from "@/Utils/types";
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

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
    userInfo : UserDto
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
        projectInfo : projectInfoResponse
        userInfo : UserDto
    }
)=>{
    const [ notesComponentExpandState , setNotesComponentExpandState] = useState<boolean>(false)
    const [ tasksComponentExpandState , setTasksComponentExpandState] = useState<boolean>(false)
    const [ issuesComponentExpandState , setIssuesComponentExpandState] = useState<boolean>(false)
    const [ chatComponentExpandState , setChatComponentExpandState] = useState<boolean>(false)
    const [project  ,setProject] = useState<projectInfoResponse>(projectInfo)
    const [user , setUser] = useState<UserDto>(userInfo)
    console.log("🚀 ~ user:", user)
    console.log('workSpace Context Rerendered');
    

   

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
                userInfo : user
            }}
            >
            {children}
        </WorkSpaceContext.Provider>
    )
}

export default WorkSpaceProvider;