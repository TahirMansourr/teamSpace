'use client'

import { ProjectDto, UserDto } from "@/Utils/types"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface FeatureContextDto{
    
}

const FeautreContext = createContext<FeatureContextDto>({} as FeatureContextDto)
export const useFeatureContext = ()=>{
    return useContext(FeautreContext)
}

const FeatureProvider = (
    {
        children,
        user
    }
    :
    { 
     children : React.ReactNode,
     user : { data : UserDto}

    }
)=>{

    
    const [userProjects , setUserProjects] = useState<ProjectDto[]>(user.data.projects)
    console.log("🚀 ~ userProjects:", userProjects)
    

    //you can use useMemo here on the value to optimize the rerendering
    const value = {
        
    }

    return(

        <FeautreContext.Provider value={value}>
            {children}
        </FeautreContext.Provider>
    )
}

export default  FeatureProvider