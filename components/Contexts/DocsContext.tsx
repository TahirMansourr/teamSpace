import { CreateChildFolderOrFile, CreateOrphanDoc, RenameFolder, UpdateFile } from "@/lib/actions/DocActions";
import { FileDto, FolderDto, ProjectDto, UserDto } from "@/Utils/types";
import { notifications } from "@mantine/notifications";
import { createContext, Dispatch, SetStateAction, use, useContext, useEffect, useState } from "react";

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
    handleUpdateFile : ({content} : {content : string}) => void,
    renameFileOrFolder : ({id , child , name , type } :{id : string, child : boolean , type : "File" | 'Folder' , name : string}) => void
    createChildFileOrFolder : ({name, type, parentId} : {name : string, type : 'File' | 'Folder', parentId : string}) => void
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
    const [allFiles , setAllFiles] = useState<FileDto[]>(projectInfo.files)
    console.log("🚀 ~ allFiles:", allFiles)
    const [allFolders , setAllFolders] = useState<FolderDto[]>(projectInfo.folders)
    console.log("🚀 ~ allFolders:", allFolders)
    const [initialContentOfFile , setInitialContentOfFile] = useState<string >('<h1> Start By Choosing A File<h1>')
    const [selectedFile , setSelectedFile] = useState<FileDto | undefined >()
    console.log("🚀 ~ selectedFile:", selectedFile)
    const [selectedFolder , setSelectedFolder] = useState<FolderDto | undefined>()
    console.log("🚀 ~ selectedFolder:", selectedFolder)

    useEffect(()=>{
        if (selectedFile) {
            setInitialContentOfFile(selectedFile.body)
            console.log("🚀 ~ useEffect ~ selectedFile.body:", selectedFile.body)
        }
            
    } , [selectedFile])

    const handleCreateDoc = async (
        name : string , 
        type : 'File' | 'Folder' , 
        parent? : string | undefined
    ) => {


        const newDoc = await CreateOrphanDoc({
            project : project._id,
            createdBy : user._id,
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

    const handleUpdateFile = async ({content } : {content : string} ) => {
        console.log("🚀 ~ handleUpdateFile ~ content:", content)
        try {
             const updatedFile = await UpdateFile({
                editedBy : user._id,
                fileId : selectedFile?._id || '',
                body : content,
            })
            if(!updatedFile) {
                notifications.show({message : 'there was an error updating your file' , color : 'red'})
                return
            }
            console.log("🚀 ~ updateFile ~ content:", updatedFile.file)

            setAllFiles(((prev)=> prev.map((prevFile) => { return prevFile._id === updatedFile.file._id ? updatedFile.file : prevFile}) ))
            notifications.show({ message :`successfully updated ${selectedFile?.name}`, color : 'blue'})
        } catch (error) {
            notifications.show({ message :`couldn't update file: ${error}`})
        }
    }

    const createChildFileOrFolder = async ({
        name , 
        parentId , 
        type,
        // fileData
    } : {
        name : string , 
        parentId : string , 
        type : 'File' | 'Folder',
        // fileData? : FileDto

    })=>{

        const fileData = {
            project : project._id,
            createdBy : user._id,
            name ,
            type,
            parent : parentId
        }
        try {
            await CreateChildFolderOrFile({
                name ,
                parentId,
                type,
                fileData
            })
        } catch (error) {
            
        }
    }

    const renameFileOrFolder = async ({
        name , 
        type , 
        child,
        id
    } : {
        name : string ,
        type : 'File' | 'Folder' , 
        child : boolean,
        id : string
    })=>{
        try {
            if(type === "File"){
            const updatedFile = await UpdateFile({
                fileId : id,
                editedBy : user._id,
                name
            })
            if(!updatedFile){ 
                notifications.show({message : 'cannot update File at the moment' , color : 'red'})
                return
            }
            const updates = {
                ...updatedFile.file,
                edits : {
                    editedBy : {
                        _id : user._id,
                        name : user.username,
                        email : user.email, 
                        image : user.image
                    },
                    editedAt : new Date()
                }
            }
            setAllFiles((prev)=> prev.map((prevFile) => { return prevFile._id === updatedFile.file._id ? updates : prevFile}) )
            } else {
            const updatedFolder = await RenameFolder({
                id,
                editedBy : user._id,
                name,
                child
            })
            if(!updatedFolder){ 
                notifications.show({message : 'cannot update folder at the moment' , color : 'red'})
                return
            }
            const updates = {
                ...updatedFolder.folder,
                edits : {
                    editedBy : {
                        _id : user._id,
                        name : user.username,
                        email : user.email, 
                        image : user.image
                    },
                    editedAt : new Date()
                }
            }
            setAllFolders((prev)=> prev.map((prevFile) => { return prevFile._id === updatedFolder.folder._id ? updates : prevFile}) )
        }
        } catch (error) {
            throw new Error(`error at renameFileOrFolder : ${error}`);
            
        }
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
        setSelectedFolder,
        handleUpdateFile,
        renameFileOrFolder,
        createChildFileOrFolder
    }
    return (
        <DocsContext.Provider value={value}>
            {children}
        </DocsContext.Provider>
    )
}

export default DocsProvider;