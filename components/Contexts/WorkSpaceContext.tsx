'use client'
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface WorkSpaceContextDto{
    notesComponentExpandState : boolean
    tasksComponentExpandState : boolean
    setNotesComponentExpandState : Dispatch<SetStateAction<boolean>>
    setTasksComponentExpandState : Dispatch<SetStateAction<boolean>>
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
    return(
        
        <WorkSpaceContext.Provider
        value={{
            notesComponentExpandState,
            setNotesComponentExpandState,
            tasksComponentExpandState ,
            setTasksComponentExpandState
        }}
        >
            {children}
        </WorkSpaceContext.Provider>
    )
}

export default WorkSpaceProvider;