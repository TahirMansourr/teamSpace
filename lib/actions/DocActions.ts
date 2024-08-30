'use server'

import Doc from "../models/DocsModel"
import { connectToDB } from "../mongoose"

type NewDocDto = {
    project : string ,
    title : string,
    createdBy : string,
}

export async function CreateNewDoc(params : NewDocDto ){
    try {
        await connectToDB()
        const newDoc = await Doc.create({
            folder : params.title,
            project : params.project,
            createdBy : params.createdBy,
            createdAt : new Date()
        })
        await newDoc.save()
        const response = newDoc.toObject()
        return {status : 'success' , newDoc : JSON.parse(JSON.stringify(response))}
    } catch (error: any) {
        throw new Error(`error at CreateNewDoc : ${error}`)
    }
}