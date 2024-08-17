'use server'

import path from "path"
import Feature from "../models/FeatureModel"
import Project from "../models/ProjectModel"
import { connectToDB } from "../mongoose"
import Doc from "../models/DocsModel"
import Task from "../models/TasksModel"
import User from "../models/UserModel"
import Issue from "../models/IssuesModel"
import Note from "../models/NotesModel"

export async function createFeature(params : { name : string  , description? : string , projectId : string , userId : string}) {
    console.log("🚀 ~ createFeature ~ params:", params)
    try {
        await connectToDB()
        const newFeature = await Feature.create({
            name : params.name,
            description : params.description || '',
            project : params.projectId,
            createdBy : params.userId
        })
        await newFeature.save()
        const updatedProject = await Project.findOneAndUpdate({_id : params.projectId}, {$push : {features : newFeature._id}})
        await updatedProject.save()
        return { status : 200 , feature : newFeature}
    } catch (error) {
        throw new Error(`error : ${error}`)
    }
}

export async function GetAllFeatures(params : { projectId : string}) {
    try {
        await connectToDB()
        const features = await Project.findOne({_id : params.projectId}).populate({
            path : 'features',
            model : Feature,
            populate : [{
                path : 'docs',
                model : Doc
            },{
                path : 'tasks',
                model : Task
            },
               { 
                path : 'createdBy', 
                model : User
                },
                {
                    path : 'issues',
                    model : Issue
                },
                {
                    path : 'notes',
                    model : Note
                }
        ]
        })
        const requiredFeatures = features.toObject()
        const response = JSON.parse(JSON.stringify(requiredFeatures))
        return { status : 200 , features : response.features}
    } catch (error) {
        throw new Error(`error : ${error}`)
    }
}