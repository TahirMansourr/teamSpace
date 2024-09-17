import { CreateOrphanDoc } from "@/lib/actions/DocActions";
import { FileDto, FolderDto, ProjectDto, UserDto } from "@/Utils/types";
import { all } from "axios";
import { createContext, Dispatch, SetStateAction, use, useContext, useState } from "react";

interface DocsContextType{
    allFiles : FileDto[],
    allFolders : FolderDto[] ,
    handleCreateDoc : (title : string , type : 'File' | 'Folder') => void
    initialContentOfFile : string 
    setInitialContentOfFile : Dispatch<SetStateAction<string >>
    selectedFile : FileDto | undefined
    setSelectedFile : Dispatch<SetStateAction<FileDto | undefined>>
    selectedFolder : FolderDto | undefined
    setSelectedFolder : Dispatch<SetStateAction<FolderDto | undefined>>
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
    const [allFiles , setAllFiles] = useState<any[]>(projectInfo.files)
    console.log("🚀 ~ allFiles:", allFiles)
    const [allFolders , setAllFolders] = useState<any[]>(projectInfo.folders)
    console.log("🚀 ~ allFolders:", allFolders)
    const [initialContentOfFile , setInitialContentOfFile] = useState<string >('<h1> Start By Choosing A File<h1>')
    const [selectedFile , setSelectedFile] = useState<FileDto | undefined >()
    const [selectedFolder , setSelectedFolder] = useState<FolderDto | undefined>()

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

        if (type === 'File') {
            setAllFiles([...allFiles , newDoc.newFile])
        }else{
            setAllFolders([...allFolders , newDoc.newFolder])
        }
    }

    const handleUpdateFile = async ({content , userId} : {content : string , userId : string} )=>{
        
    }

    const value = {
        allFiles ,
        allFolders ,
        handleCreateDoc,
        initialContentOfFile,
        setInitialContentOfFile,
        selectedFile,
        setSelectedFile,
        selectedFolder,
        setSelectedFolder
    }
    return (
        <DocsContext.Provider value={value}>
            {children}
        </DocsContext.Provider>
    )
}

export default DocsProvider;