'use server'

import Note from "../models/NotesModel"
import ProductBacklogItem from "../models/ProductBackLogItem"
import Project from "../models/ProjectModel"
import { connectToDB } from "../mongoose"

type CreateNoteDto = {
    projectId : string,
    body : string, 
    creator : string,
    createdAt? : Date,
    _id? : string,
    backlogItemId? : string,
    backlogtitle? : string
}

export async function CreateNote(params: CreateNoteDto) {
    try {
        await connectToDB()
        
        const newNote = await Note.create({
            project: params.projectId,
            body: params.body,
            createdAt: new Date(),
            creator: params.creator,
            comments: [],
            backlogItemId: params.backlogItemId,
            backlogtitle: params.backlogtitle
        })

        // Update project in background
        Project.findOneAndUpdate(
            { _id: params.projectId },
            { $push: { notes: newNote._id } }
        ).exec()

        const formattedNote = JSON.parse(JSON.stringify(newNote.toObject()))
        if (params.backlogItemId && params.backlogItemId !== '') {
            await ProductBacklogItem.findOneAndUpdate({ _id: params.backlogItemId }, { $push: { notes: formattedNote._id } }).exec()
        }
        console.log("🚀 ~ file: NoteAction.ts:34 ~ formattedNote:", formattedNote)

        return {
            status: 'success',
            note: formattedNote
        }
    } catch (error) {
        throw new Error(`Error at CreateNote: ${error}`)
    }
}


export async function UpdateNote(params: CreateNoteDto) {
    console.log("🚀 ~ UpdateNote ~ params:", params);
    try {
        await connectToDB();
        const requiredNote = await Note.findOneAndUpdate(
            { _id: params._id },
            {
                $set: {
                    body: params.body,
                    updatedAt: new Date(),
                    project: params.projectId,
                    createdAt: params.createdAt,
                    creator: params.creator,
                }
            },
            { new: true } // Add this option to return the updated document
        );

        if (!requiredNote) {
            throw new Error('Note not found');
        }

        const objResponse = requiredNote.toObject();
        console.log("🚀 ~ UpdateNote ~ objResponse:", objResponse);
        const response = JSON.parse(JSON.stringify(objResponse));
        return { status: 'success', note: response };

    } catch (error) {
        throw new Error(`error at updateNote in NoteAction.ts : ${error}`);
    }
}

export async function DeleteNote(params: { noteId: string }) {
    try {
        await connectToDB()
        const note = await Note.findByIdAndDelete(params.noteId)
        if (!note) {
            throw new Error('Note not found')
        }
        await Project.findOneAndUpdate(
            { _id: note.project },
            { $pull: { notes: note._id } }
        ).exec()
        return { status: 'success', note: note }
    } catch (error) {
        throw new Error(`error at DeleteNote : ${error}`)
    }
}