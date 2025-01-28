'use server'

import Message from "../models/MessagesModel"
import Project from "../models/ProjectModel"
import { connectToDB } from "../mongoose"

export async function CreateMessage({body , userId , projectId} : {body : string , userId : string , projectId : string}) {
    console.log("🚀 ~ CreateMessage ~ projectId:", projectId)
    try {
        connectToDB()
        const newMessage = await Message.create({
            body,
            author : userId,
            createdAt : Date.now()
        })
       await newMessage.save()
       const updatedProject =  await Project.findOneAndUpdate(
        {_id : projectId},
        {$push : {chatSpace : newMessage._id}},
        {new : true}
        )

        if (!updatedProject) {
            return { status: 'Fail', message: 'Project not found' };
        }
       const response = newMessage.toObject()
       const withjson  = JSON.parse(JSON.stringify(response))
       return({status : 'success' , response : withjson})

    } catch (error : any) {
        throw new Error(`error at createMessage : ${error}`);
        
    }
}