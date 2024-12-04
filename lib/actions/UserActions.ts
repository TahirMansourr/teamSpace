'use server'

import { JsonInput } from "@mantine/core"
import User from "../models/UserModel"
import { connectToDB } from "../mongoose"


// export async function FindUser(params: string) {
//     try {
//         await connectToDB();
        
//         const user = await User.findOne(
//             { username: { $regex: params, $options: 'i' } }, // now after this it is not case sensitive
//             { username: 1, email: 1 } 
//         );
        
//         if (!user) {
//            return {status : 'Fail' , user : {name : 'not Found' , email : 'not Found' , id : 'not found'}}
//         }

//         const userData = {
//             name: user.username,
//             id: user._id,
//             email: user.email
//         };

//         return { 
//             status: 'success', 
//             user: JSON.parse(JSON.stringify(userData)) 
//         };
//     } catch (error : any) {
//       throw new Error(`Error in FindUser: ${error.message}`);
//     }
// }

export async function FindUsers(params: string) {
    try {
        await connectToDB();
        
        const users = await User.find(
            { username: { $regex: params, $options: 'i' } },
            { username: 1, email: 1 }
        ).limit(10); // Limit results to 10 users
        
        if (!users.length) {
            return {
                status: 'not_found',
                users: []
            };
        }

        const usersData = users.map(user => ({
            name: user.username,
            id: user._id,
            email: user.email
        }));

        return { 
            status: 'success', 
            users: JSON.parse(JSON.stringify(usersData)) 
        };
    } catch (error : any) {
        return { 
            status: 'error',
            message: error.message,
            users: []
        };
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

export async function DeleteUser(id:string) {
    try {
        await connectToDB()
        const user = await User.findByIdAndDelete(id)
        return {status : 'success' , message : 'Deleted successfully'}
    } catch (error) {
        return {status : 'Fail' , message : `${error}`}
    }
}

export async function GetUsersByIds(userIds: string[]) {
    try {
        await connectToDB();
        
        const users = await User.find(
            { _id: { $in: userIds } },
            { username: 1, email: 1 , image : 1 }
        );
        
        if (!users.length) {
            return {
                status: 'not_found',
                users: []
            };
        }

        const usersData = users.map(user => ({
            username: user.username,
            id: user._id,
            email: user.email,
            image : user.image
        }));

        return { 
            status: 'success', 
            users: JSON.parse(JSON.stringify(usersData)) 
        };
    } catch (error : any) {
        return { 
            status: 'error',
            message: error.message,
            users: []
        };
    }
}
