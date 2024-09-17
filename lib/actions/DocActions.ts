'use server'

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
    parent ? : string []
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
            }
            }
         )
         await file.save()
         const response = file.toObject()
         return {status : 'success' , file : JSON.parse(JSON.stringify(response))}
        }
         
    } catch (error) {
        throw new Error(`error at UpdateFile : ${error}`)
    }
}