'use server'
import { NextResponse } from "next/server"
import Project from "../models/ProjectModel"
import { connectToDB } from "../mongoose"

interface ProjectInitialProps{
    name : string,
    content : string,
    image? : string,
    admin : string[]
}

export async function CreateProject({name , content , image , admin} : ProjectInitialProps) {
    console.log("🚀 ~ CreateProject ~ admin:", admin)
    try {
        connectToDB()
        const project = await Project.findOne({name})
        if(project) return ({status : 'Fail' , message : 'Project Name Already Exists'})
        const newProject = await Project.create({
            name, 
            content,
            image,
            admin
        })
        newProject.save()
        return ({status : 'success' , message : `Project ${name} created successfully`})
    } catch (error : any) {
       return({status : 'Fail' , message : error})
    }
}