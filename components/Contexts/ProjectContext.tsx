'use client'

import { createContext, useContext } from "react"

interface ProjectContextDto{

}

const ProjectContext = createContext<ProjectContextDto>({})
export const useProjectContext = ()=>{
    return useContext(ProjectContext)
}

const ProjectProvider = (
    {children}
    :
    {
     children : React.ReactNode
    }
)=>{

    //Here i want to have a state in where the projects page takes the projects that are here and when you create a new project the project page takes
    // it from here directly


    return(
        <ProjectContext.Provider value={''}>
            {children}
        </ProjectContext.Provider>
    )
}

export default  ProjectProvider