'use server'

import Feature from "../models/FeatureModel"
import Project from "../models/ProjectModel"
import { connectToDB } from "../mongoose"

export async function createFeature(params : { name : string  , description? : string , projectId : string}) {
    console.log("🚀 ~ createFeature ~ params:", params)
    try {
        await connectToDB()
        const newFeature = await Feature.create({
            name : params.name,
            description : params.description || '',
            project : params.projectId
        })
        await newFeature.save()
        const updatedProject = await Project.findOneAndUpdate({_id : params.projectId}, {$push : {features : newFeature._id}})
        await updatedProject.save()
        return { status : 200 , feature : newFeature}
    } catch (error) {
        throw new Error(`error : ${error}`)
    }
}