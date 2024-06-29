'use client'

import { createContext, useContext, useState } from "react"

interface ProjectContextDto{
    userInfo : any
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

    //Here i want to have a state in where the projects page takes the projects that are here and when you create a new project the project page takes
    // it from here directly
    const [userInfo , setUserInfo] = useState<any>(user)
    console.log("🚀 ~ userInfo:", userInfo)
    const value = {
        userInfo
    }
    return(

        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    )
}

export default  ProjectProvider