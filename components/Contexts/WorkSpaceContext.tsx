'use client'
import { socket } from "@/socket";
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface WorkSpaceContextDto{
    notesComponentExpandState : boolean
    tasksComponentExpandState : boolean
    issuesComponentExpandState : boolean
    chatComponentExpandState : boolean
    setNotesComponentExpandState : Dispatch<SetStateAction<boolean>>
    setTasksComponentExpandState : Dispatch<SetStateAction<boolean>>
    setIssuesComponentExpandState: Dispatch<SetStateAction<boolean>>
    setChatComponentExpandState: Dispatch<SetStateAction<boolean>>
    projectInfo : any
    userInfo : any
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
        projectInfo : any
        userInfo : any
    }
)=>{
    const [ notesComponentExpandState , setNotesComponentExpandState] = useState<boolean>(false)
    const [ tasksComponentExpandState , setTasksComponentExpandState] = useState<boolean>(false)
    const [ issuesComponentExpandState , setIssuesComponentExpandState] = useState<boolean>(false)
    const [ chatComponentExpandState , setChatComponentExpandState] = useState<boolean>(false)
    const [project  ,setProject] = useState<any>(projectInfo)
    const [user , setUser] = useState<any>(userInfo)
    console.log("🚀 ~ user:", user)
   

   

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