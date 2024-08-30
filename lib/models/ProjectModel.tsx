'use server'

import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema({
    name : String,
    creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    admins : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    team : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    image : String,
    notes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Note'
    }],
    docs : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Doc'
    }],
    Tasks : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Task'
    }],
    issues : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Issue'
    }],
    chatSpace : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Message'
    }],
    features : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Feature'
    }],
    likes: Number,
    content : String,
    // meetings: String,
    // messages : String,
    activity : Number

})

const Project = mongoose.models.Project || mongoose.model("Project" , ProjectSchema)
export default Project;