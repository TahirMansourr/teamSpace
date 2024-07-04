'use server'

import Project from "../models/ProjectModel"
import { connectToDB } from "../mongoose"
import User from "../models/UserModel"
import Message from "../models/MessagesModel"
import Task from "../models/TasksModel"

interface ProjectInitialProps{
    name : string,
    content : string,
    image? : string,
    admins : string[],
    team : string[]
}

export async function CreateProject({name , content , image , admins , team} : ProjectInitialProps) {
    console.log("🚀 ~ CreateProject ~ admin:", admins)
    try {
        await connectToDB()
        const project = await Project.findOne({name})
        if(project) return ({status : 'Fail' , message : 'Project Name Already Exists'})
        const newProject = await Project.create({
            name, 
            content,
            image,
            admins,
            team 
        })
        const response = newProject.toObject()
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
            },
            {
                path :'Tasks',
                model : Task,
                populate : [
                    {
                        path : 'assignedTo',
                        model : User
                    },
                    {
                        path : 'createdBy',
                        model : User
                    }
                ]
            },
            // {
            //     path :'notes',
            //     model : Note
            // },
            // {
            //     path :'issues',
            //     model : Issues
            // },
            
           
    ])
        if(!project) return ({status : 'Fail' , message : 'Sorry this Project does not exist anymore' , project : {}})
        const requiredProject = project.toObject()
        return ({status : 'success' , message : 'Here is your Project' , project :JSON.parse(JSON.stringify(requiredProject)) })
        
    } catch (error : any) {
        throw new Error(`error at getProjectByIdAndPopulate : ${error}`);
        
    }
}