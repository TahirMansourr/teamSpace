'use server'

import { IssueDto } from "@/Utils/types"
import Issue from "../models/IssuesModel"
import Project from "../models/ProjectModel"
import { connectToDB } from "../mongoose"
import Feature from "../models/FeatureModel"
import ProductBacklogItem from "../models/ProductBackLogItem"

type createIssueFormDto = {
    name : string,
    description : string,
    priority : 'HIGH' | 'MEDIUM' | 'LOW',
    dueDate : Date,
    assignedTo : string[],
    userId : string,
    projectId : string,
    tags : string[],
    status : 'To Do' | 'In Progress' | "Done" | 'Review',
    featureId? : string,
    backlogItemId? : string,
    backlogtitle? : string
}

export async function CreateIssue(params : createIssueFormDto) {
    try {
        await connectToDB()

        const newTask = await Issue.findOne({ name : params.name})
        if(newTask) return ({status : 'Fail' , issue : 'Name already exists'})

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
            status : params.status,
            featureId : params.featureId,
            backlogItemId : params.backlogItemId,
            backlogtitle : params.backlogtitle
        })
        await newIssue.save()
        if(params.featureId && params.featureId !== ''){
            await Feature.findOneAndUpdate({_id : params.featureId}, {$push : { issues : newIssue._id}})
         }
         if (params.backlogItemId && params.backlogItemId !== '') {
            await ProductBacklogItem.findOneAndUpdate({ _id: params.backlogItemId }, { $push: { issues: newIssue._id } }).exec()
        }
        await Project.findOneAndUpdate({_id : params.projectId} , {$push : { issues : newIssue._id}})
        const objResponse = newIssue.toObject()
        const response = JSON.parse(JSON.stringify(objResponse))
        return ({status : 'success' , issue : response})
        
    } catch (error: any) {
        throw new Error(`Error at CreateIssue : ${error}`);
        
    }
}

export async function UpdateIssue(params : createIssueFormDto & {_id : string}){
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
            status : params.status,
            lastModifed : new Date()
        }})

        await requiredIssue.save()
        const requiredIssuetoObj : IssueDto = requiredIssue.toObject()
        return ({status : 'success' , task :  JSON.parse(JSON.stringify(requiredIssuetoObj))})
    } catch (error : any) {
        throw new Error(`Error at updateIssue : ${error}`);
    }
}

export async function DeleteIssue(params: {issueId: string, projectId: string , userId : string}) {
    try {
        await connectToDB()
        
        const deletedIssue = await Issue.findOneAndDelete({ _id: params.issueId }).exec()
        
        await Project.findOneAndUpdate(
            { _id: params.projectId },
            { $pull: { issues: params.issueId } }
        ).exec()
        
        if (deletedIssue.featureId) {
            await Feature.findOneAndUpdate(
                { _id: deletedIssue.featureId },
                { $pull: { issues: params.issueId } }
            ).exec()
        }

        return { status: 'success', message: 'Issue deleted successfully' }
        
    } catch (error: any) {
        throw new Error(`Error at DeleteIssue: ${error}`)
    }
}
