'use server'

import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema({
    name : String,
    creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : ''
    },
    admins : {
        type : mongoose.Schema.Types.ObjectId,
        ref : ''
    },
    team : {
        type : mongoose.Schema.Types.ObjectId,
        ref : ''
    },
    image : String,
    notes : {
        type : mongoose.Schema.Types.ObjectId,
        ref : ''
    },
    Tasks : {
        type : mongoose.Schema.Types.ObjectId,
        ref : ''
    },
    issues : {
        type : mongoose.Schema.Types.ObjectId,
        ref : ''
    },
    chatSpace : {
        type : mongoose.Schema.Types.ObjectId,
        ref : ''
    },
    likes: Number,
    content : String,
    meetings: String,
    messages : String,
    activity : Number

})

const Project = mongoose.models.Project || mongoose.model("Project" , ProjectSchema)
export default Project;