'use server'

import Message from "../models/MessagesModel"
import { connectToDB } from "../mongoose"

export async function CreateMessage({body , userId} : {body : string , userId : string}) {
    try {
        connectToDB()
        const newMessage = await Message.create({
            body,
            author : userId,
            createdAt : Date.now()
        })
       await newMessage.save()
       const response = newMessage.toObject()
       return({status : 'success' , response})

    } catch (error : any) {
        throw new Error(`error at createMessage : ${error}`);
        
    }
}