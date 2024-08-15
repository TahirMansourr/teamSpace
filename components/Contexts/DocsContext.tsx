import { ProjectDto, UserDto } from "@/Utils/types";
import { createContext, use, useContext, useState } from "react";

const DocsContext = createContext({})

export const useDocsContext = ()=>{
    return useContext(DocsContext)
}

const DocsProvider = ({children , userInfo , projectInfo} : {children : React.ReactNode , userInfo : UserDto , projectInfo : ProjectDto})=>{
    
    const [user , setUser] = useState<UserDto>(userInfo)
    const [project , setProject] = useState<ProjectDto>(projectInfo)

    const value = {}
    return (
        <DocsContext.Provider value={value}>
            {children}
        </DocsContext.Provider>
    )
}

export default DocsProvider;