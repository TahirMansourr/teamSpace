'use server'

import Doc from "../models/DocsModel"
import { connectToDB } from "../mongoose"

type NewDocDto = {
    project : string ,
    title : string,
    body : string,
    createdBy : string,
    createdAt : Date,
    edits : []
}

export async function CreateNewDoc(params : NewDocDto ){
    try {
        await connectToDB()
        const newDoc = await Doc.create({
            title : params.title,
            project : params.project,
            body : params.body,
            createdBy : params.createdBy,
            createdAt : new Date()
        })
        await newDoc.save()
    } catch (error: any) {
        throw new Error(`error at CreateNewDoc : ${error}`)
    }
}