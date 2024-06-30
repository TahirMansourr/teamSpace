'use server'

import Project from "../models/ProjectModel"
import { connectToDB } from "../mongoose"
import User from "../models/UserModel"

interface ProjectInitialProps{
    name : string,
    content : string,
    image? : string,
    admins : string[]
}

export async function CreateProject({name , content , image , admins} : ProjectInitialProps) {
    console.log("🚀 ~ CreateProject ~ admin:", admins)
    try {
        connectToDB()
        const project = await Project.findOne({name})
        if(project) return ({status : 'Fail' , message : 'Project Name Already Exists'})
        const newProject = await Project.create({
            name, 
            content,
            image,
            admins
        })
        const response = newProject.toObject()
        console.log("🚀 ~ CreateProject ~ response:", response)
        newProject.save()
        const requiredAdmin = await User.findOne({_id : admins[0]})
        if(!requiredAdmin) return({status : "Fail" , message : "Unexpected problem , please logOut and signIn again"})
        await requiredAdmin.updateOne({ $push: { projects: newProject._id } })
        await requiredAdmin.save()
        console.log("🚀 ~ CreateProject ~ requiredAdmin:", requiredAdmin)
        return ({status : 'success' , message : `Project ${name} created successfully` , project : response})
    } catch (error : any) {
       return({status : 'Fail' , message : error})
    }
        
}