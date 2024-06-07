'use client'
import React, { createContext, useContext } from "react";


const WorkSpaceContext = createContext({})

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
    return(
        <WorkSpaceContext.Provider
        value={{}}
        >
            {children}
        </WorkSpaceContext.Provider>
    )
}

export default WorkSpaceProvider;