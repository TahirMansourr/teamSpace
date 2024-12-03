'use server'

import Project from "../models/ProjectModel"
import { connectToDB } from "../mongoose"
import User from "../models/UserModel"
import Message from "../models/MessagesModel"
import Task from "../models/TasksModel"
import Issue from "../models/IssuesModel"
import Note from "../models/NotesModel"
import Folder from "../models/FolderModel"
import File from "../models/FileModel"

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
                model : Message,
                populate : {
                    path : 'author',
                    model : User
                }
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
            {
                path :'issues',
                model : Issue,
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
            {
                path :'notes',
                model : Note,
                populate : [
                    {
                        path : 'creator',
                        model : User
                    },
                    
                ]
            },{
                path : 'folders',
                model : Folder,
                populate : [
                    {
                        path : 'createdBy',
                        model : User
                    },
                    
                ]
            },
            {
                path : 'files',
                model : File,
                populate : [
                    {
                        path : 'createdBy',
                        model : User
                    },
                    
                ]
            }
           
            
           
    ])
        if(!project) return ({status : 'Fail' , message : 'Sorry this Project does not exist anymore' , project : {}})
        const requiredProject = project.toObject()
        return ({status : 'success' , message : 'Here is your Project' , project :JSON.parse(JSON.stringify(requiredProject)) })
        
    } catch (error : any) {
        throw new Error(`error at getProjectByIdAndPopulate : ${error}`);
        
    }
}

export async function DeleteProject(projectId: string) {
    try {
        await connectToDB()
        
        // Find and delete the project
        const project = await Project.findById(projectId)
        if (!project) return { status: 'Fail', message: 'Project not found' }

        // Remove project reference from all team members
        await User.updateMany(
            { projects: projectId },
            { $pull: { projects: projectId } }
        )

        // Delete all associated data
        await Message.deleteMany({ project: projectId })
        await Task.deleteMany({ project: projectId })
        await Issue.deleteMany({ project: projectId })
        await Note.deleteMany({ project: projectId })
        await File.deleteMany({ project: projectId })
        await Folder.deleteMany({ project: projectId })

        // Delete the project itself
        await Project.findByIdAndDelete(projectId)

        return {
            status: 'success',
            message: 'Project deleted successfully'
        }

    } catch (error: any) {
        return {
            status: 'Fail',
            message: `Failed to delete project: ${error.message}`
        }
    }
}

export async function RearrangeUserProjectsArray({projectsArray, userId}: {projectsArray: string[], userId: string}) {
    try {
        await connectToDB()
        const userProjects = await User.findById(userId)
        if(!userProjects) return ({status: 'Fail', message: 'Sorry this user does not exist anymore', project: {}})
        
        userProjects.projects = projectsArray
        await userProjects.save() 
        
        return ({
            status: 'success', 
            message: 'Projects rearranged successfully', 
            project: JSON.parse(JSON.stringify(userProjects))
        })
    } catch (error: any) {
        throw new Error(`error at RearrangeUserProjectsArray: ${error}`)
    }
}

