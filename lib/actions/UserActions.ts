'use server'

import User from "../models/UserModel"
import { connectToDB } from "../mongoose"

export async function FindUser(params:string) {
    try {
        await connectToDB()
        const user = await User.findOne({ username : params})
        const usertoObject = user.toObject()
        const requiredFields = {
            name : usertoObject.username,
            id : usertoObject._id,
            email : usertoObject.email
        }
        const response = JSON.parse(JSON.stringify(requiredFields))
        return {status : 'success' , user : response}
    } catch (error : any) {
        return {status : 'Fail' , user : {name : 'not Found' , email : 'not Found' , id : 'not found'}}
       
        
    }
}