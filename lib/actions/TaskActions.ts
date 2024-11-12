'use server'

import Feature from "../models/FeatureModel"
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
    featureId? : string
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
            status : params.status,
            featureId : params.featureId
        })
        await newTask.save()
        if(params.featureId && params.featureId !== ''){
           await Feature.findOneAndUpdate({_id : params.featureId}, {$push : { tasks : newTask._id}})
        }
        await Project.findOneAndUpdate({_id : params.projectId} , {$push : { Tasks : newTask._id}})
        const objResponse = newTask.toObject()
        const response = JSON.parse(JSON.stringify(objResponse))
        return ({status : 'success' , task : response})
        
    } catch (error: any) {
        throw new Error(`Error at CreateTask : ${error}`);
        
    }
}

export async function UpdateTask(params : createTaskFormDto & {_id : string}){
    try {
        await connectToDB()
        const requiredTask = await Task.findOneAndUpdate({_id : params._id} , {$set :{
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

        await requiredTask.save()
        const requiredTasktoObj = requiredTask.toObject()
        return ({status : 'success' , task :  JSON.parse(JSON.stringify(requiredTasktoObj))})
    } catch (error : any) {
        throw new Error(`Error at updateTask : ${error}`);
    }
}

export async function DeleteTask(taskId: string) {
    try {
        await connectToDB();
        
        const taskToDelete = await Task.findById(taskId);
        const deletedTask = await Task.findByIdAndDelete(taskId);
        Project.findOneAndUpdate(
            { _id: taskToDelete.project },
            { $pull: { Tasks: taskId } }
        ).exec();

        if (taskToDelete.featureId) {
            Feature.findOneAndUpdate(
                { _id: taskToDelete.featureId },
                { $pull: { tasks: taskId } }
            ).exec();
        }

        const formattedTask = JSON.parse(JSON.stringify(deletedTask.toObject()));
        
        return {
            status: 'success',
            task: formattedTask
        };

    } catch (error) {
        throw new Error(`Error at DeleteTask: ${error}`);
    }
}
