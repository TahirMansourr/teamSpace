'use server'

import { FileDto } from "@/Utils/types"
import File from "../models/FileModel"
import Folder from "../models/FolderModel"
import Project from "../models/ProjectModel"
import { connectToDB } from "../mongoose"

type NewFileOrFolderDto = {
    project : string ,
    name : string,
    createdBy : string,
    type : 'File' | 'Folder',
    body ? : string,
    parent ? : string 
}

export async function CreateOrphanDoc(params : NewFileOrFolderDto ){
    try {
        await connectToDB()

        const NewFileOrFolderFields = {
            project : params.project,
            name : params.name,
            createdBy : params.createdBy,
            createdAt : new Date(),
           ...(params.parent ?  {parent : params.parent} : {}),
           ...(params.body ?  {body : params.body} : {}),
        }

        

        if(params.type === 'File'){
            const newFile = await File.create(NewFileOrFolderFields)
            console.log("🚀 ~ CreateOrphanDoc ~ newFile:", newFile)
            await newFile.save()
            const project = await Project.findOneAndUpdate(
                {_id : params.project} ,
                {
                    $push : {
                        files : newFile
                    }
                }
            )
            await project.save()
            const response = newFile.toObject()
            return {status : 'success' , newFile : JSON.parse(JSON.stringify(response))}
        }else{
            const newFolder = await Folder.create(NewFileOrFolderFields)
            console.log("🚀 ~ CreateOrphanDoc ~ newFolder:", newFolder)
            const project = await Project.findOneAndUpdate(
                {_id : params.project} ,
                {
                    $push : {
                        folders : newFolder._id
                    }
                }
            )
            await project.save()
            await newFolder.save()
            const response = newFolder.toObject()
            return {status : 'success' , newFolder : JSON.parse(JSON.stringify(response))}
        }
       
    } catch (error: any) {
        throw new Error(`error at CreateNewDoc : ${error}`)
    }
}

export async function CreateFolderInsideFolder(params:any) {
    
}

interface UpdateFileParams {
    fileId : string ,
    body? : string
    name? : string,
    parentId? : string,
    editedBy : string
}
export async function UpdateFile(params : UpdateFileParams){
    try {
        await connectToDB()
        if(!params.parentId){
        const file = await File.findOneAndUpdate({_id : params.fileId} , {
            $set : {
                ...(params.body ? {body : params.body} : {}) ,
                ...(params.name ? {name : params.name} : {})
            },
            $push : {
                edits : {
                    editedBy : params.editedBy ,
                    editedAt : new Date(),
                    ...(params.body ? {editedContent : params.body} : {}) ,
                    ...(params.name ? {editedName : params.name} : {})
                }
            },
            },
            {new : true}
         )
         await file.save()
         const response = file.toObject()
         return {status : 'success' , file : JSON.parse(JSON.stringify(response))}
        }
         
    } catch (error) {
        throw new Error(`error at UpdateFile : ${error}`)
    }
}

export async function RenameFolder({ name , child , id , editedBy} : {name : string , child : boolean , id : string , editedBy : string}) {
    try {
        await connectToDB()
        if(!child){
            const folder = await Folder.findOneAndUpdate({_id : id} , {
                $set : {
                    name
                },
                $push : {
                    edits : {
                        editedBy : editedBy ,
                        editedAt : new Date(),
                        name
                    }
                },
            } , {new : true})
            await folder.save()
            const response = folder.toObject()
            return {status : 'success' , folder : JSON.parse(JSON.stringify(response))}
        }

    } catch (error) {
        
    }
}

export async function CreateChildFolderOrFile({
    parentId , 
    name , 
    type , 
    fileData
} : {
    parentId : string , 
    name : string , 
    type : 'File'| 'Folder', 
    fileData? : NewFileOrFolderDto
}) {
    try {
        await connectToDB()
        const parentFolder = await Folder.findById(parentId);
        if (!parentFolder) {
            throw new Error("Parent folder not found");
        }
        let newChild;
        if (type === 'File') {
            newChild = new File({
                ...fileData 
            });
            await newChild.save();
            parentFolder.children.push({ type: 'File', file: newChild });
        } else if (type === 'Folder') {
            newChild = new Folder({ name, parent: parentFolder._id });
            await newChild.save();
            parentFolder.children.push({ type: 'Folder', folder: newChild._id });
        }
        await parentFolder.save();
        return newChild;
    } catch (error) {
        
    }
}