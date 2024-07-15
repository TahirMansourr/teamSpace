'use server'

import Note from "../models/NotesModel"
import Project from "../models/ProjectModel"
import { connectToDB } from "../mongoose"

type CreateNoteDto = {
    projectId : string,
    body : string, 
    creator : string,
    createdAt? : Date,
    _id? : string
}

export async function CreateNote(params : CreateNoteDto){
    try {
        await connectToDB()
         const newNote = await Note.create({
            project : params.projectId,
            body : params.body,
            createdAt : new Date(),
            creator : params.creator,
            comments : []
         })

         await newNote.save()
         await Project.findOneAndUpdate({_id : params.projectId} , {$push : {notes : newNote._id}})
         const objResponse = newNote.toObject()
         const response = JSON.parse(JSON.stringify(objResponse))
         return({status : 'success' , note : response})

    } catch (error) {
        throw new Error(`Error at CreateNote : ${error}`);
    }
}

export async function UpdateNote(params : CreateNoteDto){
    try {
        await connectToDB()
        const requiredNote = await Note.findOneAndUpdate({_id : params._id} , {
            $set : {
                body : params.body,
                updatedAt : new Date(),
                project : params.projectId,
                createdAt : params.createdAt,
                creator : params.creator,
            }
        })
        await requiredNote.save()
        const objResponse = requiredNote.toObject()
        const response = JSON.parse(JSON.stringify(objResponse))
        return({status : 'success' , note : response})

    } catch (error) {
        throw new Error(`error at updateNote in NoteAction.ts : ${error}`)
    }
}