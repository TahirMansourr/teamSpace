'use client'
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface WorkSpaceContextDto{
    notesComponentExpandState : boolean
    tasksComponentExpandState : boolean
    issuesComponentExpandState : boolean
    chatComponentExpandState : boolean
    setNotesComponentExpandState : Dispatch<SetStateAction<boolean>>
    setTasksComponentExpandState : Dispatch<SetStateAction<boolean>>
    setIssuesComponentExpandState: Dispatch<SetStateAction<boolean>>
    setChatComponentExpandState: Dispatch<SetStateAction<boolean>>
}

const WorkSpaceContext = createContext<WorkSpaceContextDto>({} as WorkSpaceContextDto)

export const useWorkSpaceContext = () => {
    return useContext(WorkSpaceContext);
};

const WorkSpaceProvider = (
    {children}
    :
    {
        children : React.ReactNode
    }
)=>{
    const [ notesComponentExpandState , setNotesComponentExpandState] = useState<boolean>(false)
    const [ tasksComponentExpandState , setTasksComponentExpandState] = useState<boolean>(false)
    const [ issuesComponentExpandState , setIssuesComponentExpandState] = useState<boolean>(false)
    const [ chatComponentExpandState , setChatComponentExpandState] = useState<boolean>(false)
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
            setChatComponentExpandState
        }}
        >
            {children}
        </WorkSpaceContext.Provider>
    )
}

export default WorkSpaceProvider;