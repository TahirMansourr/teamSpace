'use client'

import { ProjectDto, UserDto } from "@/Utils/types"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface ProjectContextDto{
    userProjects : ProjectDto[],
    setUserProjects : Dispatch<SetStateAction<ProjectDto[]>>
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
     user : UserDto

    }
)=>{

    
    const [userProjects , setUserProjects] = useState<ProjectDto[]>(user.projects)
    console.log("🚀 ~ userProjects:", userProjects)
    

    //you can use useMemo here on the value to optimize the rerendering
    const value = {
        userProjects,
        setUserProjects,
    }

    return(

        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    )
}

export default  ProjectProvider