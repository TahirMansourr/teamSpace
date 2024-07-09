'use server'

import Issue from "../models/IssuesModel"
import Project from "../models/ProjectModel"
import Task from "../models/TasksModel"
import { connectToDB } from "../mongoose"

type createIssueFormDto = {
    name : string,
    description : string,
    priority : 'HIGH' | 'MEDIUM' | 'LOW',
    dueDate : Date,
    assignedTo : string[],
    userId : string,
    projectId : string,
    tags : string[],
    status : 'To Do' | 'In Progress' | "Done" | 'Review'
}
export async function CreateTask(params : createIssueFormDto) {
    try {
        await connectToDB()

        const newIssue = await Issue.create({
            name : params.name,
            description : params.description,
            priority : params.priority,
            dueDate : params.dueDate,
            assignedTo : params.assignedTo,
            createdAt : new Date(),
            project : params.projectId,
            createdBy : params.userId,
            tags : params.tags,
            status : params.status
        })
        await newIssue.save()
        await Project.findOneAndUpdate({_id : params.projectId} , {$push : { issues : newIssue._id}})
        const objResponse = newIssue.toObject()
        const response = JSON.parse(JSON.stringify(objResponse))
        return ({status : 'success' , issue : response})
        
    } catch (error: any) {
        throw new Error(`Error at CreateTask : ${error}`);
        
    }
}

export async function UpdateTask(params : createIssueFormDto & {_id : string}){
    try {
        await connectToDB()
        const requiredIssue = await Issue.findOneAndUpdate({_id : params._id} , {$set :{
            name : params.name,
            description : params.description,
            priority : params.priority,
            dueDate : params.dueDate,
            assignedTo : params.assignedTo,
            createdAt : new Date(),
            project : params.projectId,
            createdBy : params.userId,
            tags : params.tags,
            status : params.status
        }})

        await requiredIssue.save()
        const requiredIssuetoObj = requiredIssue.toObject()
        return ({status : 'success' , task :  JSON.parse(JSON.stringify(requiredIssuetoObj))})
    } catch (error : any) {
        throw new Error(`Error at updateTask : ${error}`);
    }
}