'use server'

import Project from "../models/ProjectModel"
import Task from "../models/TasksModel"
import { connectToDB } from "../mongoose"
type createTaskFormDto = {
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
export async function CreateTask(params : createTaskFormDto) {
    try {
        await connectToDB()

        const newTask = await Task.create({
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
        await newTask.save()
        await Project.findOneAndUpdate({_id : params.projectId} , {$push : { Tasks : newTask._id}})
        const objResponse = newTask.toObject()
        const response = JSON.parse(JSON.stringify(objResponse))
        return ({status : 'success' , task : response})
        
    } catch (error: any) {
        throw new Error(`Error at CreateTask : ${error}`);
        
    }
}