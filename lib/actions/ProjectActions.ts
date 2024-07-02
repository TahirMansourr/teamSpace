'use server'

import Project from "../models/ProjectModel"
import { connectToDB } from "../mongoose"
import User from "../models/UserModel"
import Message from "../models/MessagesModel"

interface ProjectInitialProps{
    name : string,
    content : string,
    image? : string,
    admins : string[]
}

export async function CreateProject({name , content , image , admins} : ProjectInitialProps) {
    console.log("🚀 ~ CreateProject ~ admin:", admins)
    try {
        await connectToDB()
        const project = await Project.findOne({name})
        if(project) return ({status : 'Fail' , message : 'Project Name Already Exists'})
        const newProject = await Project.create({
            name, 
            content,
            image,
            admins
        })
        const response = newProject.toObject()
        const newResponse = {...response , _id : response._id.toString()}
        console.log("🚀 ~ CreateProject ~ response:", response)
        newProject.save()
        const requiredAdmin = await User.findOne({_id : admins[0]})
        if(!requiredAdmin) return({status : "Fail" , message : "Unexpected problem , please logOut and signIn again"})
        await requiredAdmin.updateOne({ $push: { projects: newProject._id } })
        await requiredAdmin.save()
        console.log("🚀 ~ CreateProject ~ requiredAdmin:", requiredAdmin)
        return ({status : 'success' , message : `Project ${name} created successfully` , project : JSON.parse(JSON.stringify(response))})
    } catch (error : any) {
       return({status : 'Fail' , message : error})
    }
        
}

export async function GetProjectByIdAndPopulate({id} : {id : string}){
    try {
        await connectToDB()
        const project = await Project.findOne({_id : id }).populate([
            {
            path : 'creator',
            model : User
            },
            {
                path :'admins',
                model : User
            },
            {
                path :'team',
                model : User
            }, 
            {
                path :'chatSpace',
                model : Message
            }
            // {
            //     path :'notes',
            //     model : Note
            // },
            // {
            //     path :'issues',
            //     model : Issues
            // },
            // {
            //     path :'Tasks',
            //     model : Tasks
            // },
           
    ])
        if(!project) return ({status : 'Fail' , message : 'Sorry this Project does not exist anymore' , project : {}})
        const requiredProject = project.toObject()
        return ({status : 'success' , message : 'Here is your Project' , project :JSON.parse(JSON.stringify(requiredProject)) })
        
    } catch (error : any) {
        throw new Error(`error at getProjectByIdAndPopulate : ${error}`);
        
    }
}