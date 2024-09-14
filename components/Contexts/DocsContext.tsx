import { CreateOrphanDoc } from "@/lib/actions/DocActions";
import { ProjectDto, UserDto } from "@/Utils/types";
import { createContext, use, useContext, useState } from "react";

interface DocsContextType{
    allDocs : any[],
    handleCreateDoc : (title : string , type : 'File' | 'Folder') => void
}
const DocsContext = createContext<DocsContextType>({} as DocsContextType)

export const useDocsContext = ()=>{
    return useContext(DocsContext)
}

const DocsProvider = ({
    children , 
    userInfo , 
    projectInfo
} : {
    children : React.ReactNode , 
    userInfo : UserDto , 
    projectInfo : ProjectDto
})=>{    
    const [user , setUser] = useState<UserDto>(userInfo)
    const [project , setProject] = useState<ProjectDto>(projectInfo)
    const [allDocs , setAllDocs] = useState<any[]>(projectInfo.docs)

    const handleCreateDoc = async (
        name : string , 
        type : 'File' | 'Folder' , 
        parent? : string [] | undefined
    ) => {

        const newDoc = await CreateOrphanDoc({
            project : projectInfo._id,
            createdBy : userInfo._id,
            name ,
            type,
            parent : parent || undefined
        })

        setAllDocs((prev : any) => [...prev , newDoc])
    }

    const value = {
        allDocs,
        handleCreateDoc
    }
    return (
        <DocsContext.Provider value={value}>
            {children}
        </DocsContext.Provider>
    )
}

export default DocsProvider;