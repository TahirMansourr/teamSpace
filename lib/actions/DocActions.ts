'use server'

import File from "../models/FileModel"
import Folder from "../models/FolderModel"
import Doc from "../models/FolderModel"
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
            await newFile.save()
            const response = newFile.toObject()
            return {status : 'success' , newFile : JSON.parse(JSON.stringify(response))}
        }else{
            const newFolder = await Folder.create(NewFileOrFolderFields)
            await newFolder.save()
            const response = newFolder.toObject()
            return {status : 'success' , newFolder : JSON.parse(JSON.stringify(response))}
        }
       
    } catch (error: any) {
        throw new Error(`error at CreateNewDoc : ${error}`)
    }
}