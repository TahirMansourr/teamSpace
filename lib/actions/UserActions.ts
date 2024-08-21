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

export async function UpdateUser(params: {id : string , username ? : string , email? : string , image? : string}) {
    try {
        await connectToDB()
        const oldUser = await User.findOne({_id : params.id})
        if(params.username === oldUser?.username && params.email === oldUser?.email && params.image === oldUser?.image){
             return {status : 'success' , message : 'No changes made'}
        }else if(params.username != oldUser?.username && params.email === oldUser?.email){
            const userFromUsername = await User.findOne(
                {username : params.username},
            )
            if(userFromUsername) return {status : 'Fail' , message : 'Username already exists'}
            
            const user = await User.findOneAndUpdate(
                {_id : params.id},
                {$set : {
                    ...(params.username ? {username : params.username} : {})
                    , ...(params.email ? {email : params.email} : {})
                    , ...(params.image ? {image : params.image} : {})
                }}
            )
            await user.save()
            return {status : 'success' , message : 'Updated successfully'}
        }else if(params.username === oldUser?.username && params.email != oldUser?.email){
            const userFromEmail = await User.findOne(
                {email : params.email},
            )
            if(userFromEmail) return {status : 'Fail' , message : 'Email already exists'}

            const user = await User.findOneAndUpdate(
                {_id : params.id},
                {$set : {
                    ...(params.username ? {username : params.username} : {})
                    , ...(params.email ? {email : params.email} : {})
                    , ...(params.image ? {image : params.image} : {})
                }}
            )
            await user.save()
            return {status : 'success' , message : 'Updated successfully'}
        }
    } catch (error) {
        return {status : 'Fail' , message : `${error}`}
    }
    
}