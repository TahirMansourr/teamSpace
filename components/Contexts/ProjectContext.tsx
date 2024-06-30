'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface ProjectContextDto{
    userProjects : any[],
    setUserProjects : Dispatch<SetStateAction<any>>
}

const ProjectContext = createContext<ProjectContextDto>({} as ProjectContextDto)
export const useProjectContext = ()=>{
    return useContext(ProjectContext)
}

const ProjectProvider = (
    {
        children,
        user
    }
    :
    { 
     children : React.ReactNode,
     user : any

    }
)=>{

    
    const [userProjects , setUserProjects] = useState<any[]>(user.data.projects)
    console.log("🚀 ~ userProjects:", userProjects)
    
    const value = {
        userProjects,
        setUserProjects
    }
    return(

        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    )
}

export default  ProjectProvider